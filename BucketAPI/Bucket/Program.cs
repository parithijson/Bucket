using Bucket.Context;
using Bucket.Service.Interface;
using Bucket.Service.Service_Class;
using MathNet.Numerics.Distributions;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<BucketContext>(
    optionsAction: options => options.UseSqlServer(
        builder.Configuration.GetConnectionString("SQLServerConnection")
    )
    );
builder.Services.AddScoped<IUsers, UserService>();
builder.Services.AddScoped<IProjects, ProjectService>();
builder.Services.AddScoped<ISearch, SearchService>();
builder.Services.AddScoped<ILike, LikeService>();
builder.Services.AddScoped<IComment, CommentService>();
builder.Services.AddScoped<ILogin, LoginService>();
builder.Services.AddScoped<IGetByUser, GetByUserService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.AllowAnyHeader();
        builder.AllowAnyMethod();
        builder.AllowAnyOrigin();
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.UseAuthorization();

app.MapControllers();

app.Run();
