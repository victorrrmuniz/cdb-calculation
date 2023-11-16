using webapi.DTOs;

namespace webapi.Services
{
    public class CdbService : ICdbService
    {
        private readonly double CDI = 0.009;
        private readonly double TB = 1.08;
        private readonly double TAX_UP_TO_6_MONTHS = 0.225;
        private readonly double TAX_UP_TO_12_MONTHS = 0.2;
        private readonly double TAX_UP_TO_24_MONTHS = 0.175;
        private readonly double TAX_OVER_24_MONTHS = 0.15;

        public InvestmentDto Calculate(double monetaryValue, int month)
        {
            if (month < 1)
                throw new InvalidDataException("O mês deve ser positivo");

            var grossValue = CalculateGrossValue(monetaryValue, month);
            var netValue = CalculateNetValue(grossValue, month);

            return new InvestmentDto
            {
                GrossValue = grossValue,
                NetValue = netValue
            };
        }

        private double CalculateGrossValue(double monetaryValue, int month)
        {
            var finalValue = monetaryValue * Math.Pow(1 + (CDI * TB), month);
            return Math.Round(finalValue, 2);
        }

        private double CalculateNetValue(double grossValue, int month)
        {
            double result = 0;
            if (month <= 6)
                result = grossValue * (1 - TAX_UP_TO_6_MONTHS);
            else if (month <= 12)
                result = grossValue * (1 - TAX_UP_TO_12_MONTHS);
            else if (month <= 24)
                result = grossValue * (1 - TAX_UP_TO_24_MONTHS);
            else
                result =  grossValue * (1 - TAX_OVER_24_MONTHS);

            return Math.Round(result, 2);

        }
    }
}
