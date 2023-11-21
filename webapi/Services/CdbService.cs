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
            var yield = grossValue - monetaryValue;
            var netValue = monetaryValue + CalculateNetIncome(yield, month);

            return new InvestmentDto
            {
                GrossValue = grossValue,
                NetValue = netValue
            };
        }

        private double CalculateGrossValue(double monetaryValue, int month)
        {
            var grossValue = monetaryValue * Math.Pow(1 + (CDI * TB), month);
            return Math.Round(grossValue, 2);
        }

        private double CalculateNetIncome(double yield, int month)
        {
            double netIncome;
            if (month <= 6)
                netIncome = yield * (1 - TAX_UP_TO_6_MONTHS);
            else if (month <= 12)
                netIncome = yield * (1 - TAX_UP_TO_12_MONTHS);
            else if (month <= 24)
                netIncome = yield * (1 - TAX_UP_TO_24_MONTHS);
            else
                netIncome =  yield * (1 - TAX_OVER_24_MONTHS);

            return Math.Round(netIncome, 2);

        }
    }
}
