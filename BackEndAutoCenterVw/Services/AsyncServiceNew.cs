using Domain.Exceptions;
using Domain.Models;
using Domain.Repositories;
using Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;

namespace Services
{
    internal sealed class AsyncServiceNew : IAsyncServiceNew<New, Img>
    {
        private readonly IUnitOfWork unitOfWork;

        public AsyncServiceNew(
           IUnitOfWork unitOfWork
            )
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task Create(
            New item,
            string email,
            List<Img> imgs,
            CancellationToken cancellationToken = default
            )
        {
            Employee employee =
                await unitOfWork.AsyncRepositoryEmployee.FindByUserEmail(email);
            if (employee == null)
                throw new EmployeeNotFound(email);
            New news = await unitOfWork.AsyncRepositoryNew.GetByTitle(item.Title);
            if (news != null)
                throw new NewTitleIsAlredyAdded(item.Title);
            item.Created = DateTime.Now;
            item.EmployeeId =
                (await unitOfWork.AsyncRepositoryEmployee.FindByUserEmail(email)).UserId;
            item.Imgs = imgs;
            await unitOfWork.AsyncRepositoryNew.Create(item);
            await unitOfWork.CompleteAsync();
        }

        public async Task<New> FindById(
            int id,
            CancellationToken cancellationToken = default
            )
        {
            return await unitOfWork.AsyncRepositoryNew.GetById(id);
        }

        public async Task<IEnumerable<New>> GetAll(CancellationToken cancellationToken = default)
        {
            return await unitOfWork.AsyncRepositoryNew.Get();
        }

        public async Task<New> GetByTitile(
            string title,
            CancellationToken cancellationToken = default
            )
        {
            return await unitOfWork.AsyncRepositoryNew.GetByTitle(title);
        }

        public async Task Remove(
            string title,
            CancellationToken cancellationToken = default
            )
        {
            New news = await unitOfWork.AsyncRepositoryNew.GetByTitle(title);
            if (news == null)
                throw new NewNotFound(title);
            news.IsDeleted = true;
            unitOfWork.AsyncRepositoryNew.Update(news);
            await unitOfWork.CompleteAsync();
        }

        public async Task Update(
            New item,
            List<Img> imgs,
            string newTitle = null,
            CancellationToken cancellationToken = default
            )
        {
            //Employee employee = await unitOfWork.AsyncRepositoryEmployee.FindByUserEmail(email);
            //if (employee == null)
            //    throw new UserEmailNotFound(email);
            New news =
                await unitOfWork.AsyncRepositoryNew.GetByTitle(item.Title);
            if (news == null)
                throw new NewNotFound(item.Title);
            else if (newTitle != null)
            {
                New checkTitleNew =
                    await unitOfWork.AsyncRepositoryNew.GetByTitle(newTitle);
                if (checkTitleNew != null)
                    throw new NewTitleIsAlredyAdded(newTitle);
                news.Title = newTitle;
            }
            var urlImgsForm = imgs.Select(i => i.Url);
            var urlImgsDb = news.Imgs.Select(i => i.Url);
            List<Img> removeImgs = news.Imgs
                .Where(i => urlImgsDb.Except(urlImgsForm)
                .Contains(i.Url))
                .ToList();
            List<Img> addImgs = (imgs
                .Where(i => urlImgsForm.Except(urlImgsDb).Contains(i.Url)))
                .Select(i => new Img { Url = i.Url, NewId = news.Id })
                .ToList();
            if (addImgs.Count != 0)
            {
                await unitOfWork.AsyncRepositoryImg.AddRange(addImgs);
                await unitOfWork.CompleteAsync();
            }
            if (removeImgs.Count != 0)
            {
                unitOfWork.AsyncRepositoryImg.DeleteRange(removeImgs);
                await unitOfWork.CompleteAsync();
            }
            news.Description = item.Description;
            unitOfWork.AsyncRepositoryNew.Update(news);
            await unitOfWork.CompleteAsync();
        }
    }
}
