#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["BackEndAutoCenterVw/BackEndAutoCenterVw.csproj", "BackEndAutoCenterVw/"]
COPY ["Services.Abstractions/Services.Abstractions.csproj", "Services.Abstractions/"]
COPY ["Contracts/Contracts.csproj", "Contracts/"]
COPY ["Domain/Domain.csproj", "Domain/"]
COPY ["Persistence/Persistence.csproj", "Persistence/"]
COPY ["Services/Services.csproj", "Services/"]
COPY ["Presentation/Presentation.csproj", "Presentation/"]
RUN dotnet restore "BackEndAutoCenterVw/BackEndAutoCenterVw.csproj"
COPY . .
WORKDIR "/src/BackEndAutoCenterVw"
RUN dotnet build "BackEndAutoCenterVw.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BackEndAutoCenterVw.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BackEndAutoCenterVw.dll"]