using webapi.DTOs;

namespace webapi.Services
{
    public interface ICdbService
    {
        InvestmentDto Calculate(double monetaryValue, int month);
    }
}
