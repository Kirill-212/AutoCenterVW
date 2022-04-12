using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public sealed class RepositoryDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<New> News { get; set; }

        public DbSet<Img> Imgs { get; set; }

        public DbSet<ActionCar> ActionCars { get; set; }

        public DbSet<Car> Cars { get; set; }

        public DbSet<ClientCar> ClientCars { get; set; }

        public DbSet<ImgCar> ImgCars { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<TestDrive> TestDrives { get; set; }

        public DbSet<CarRepair> CarRepairs { get; set; }

        public RepositoryDbContext(DbContextOptions options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>().Property(u => u.TotalCost).HasColumnType("money");
            modelBuilder.Entity<Car>().Property(u => u.Cost).HasColumnType("money");
            modelBuilder.Entity<Employee>().HasKey(u => u.UserId);
            modelBuilder.Entity<Role>()
                            .HasIndex(u => u.RoleName)
                            .IsUnique();

        }
    }
}
