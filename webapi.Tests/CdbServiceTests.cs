using NUnit.Framework;
using webapi.Services;

namespace webapi.Tests
{
    [TestFixture]
    public class CdbServiceTests
    {
        private ICdbService _cdbService;

        [SetUp]
        public void Setup()
        {
            _cdbService = new CdbService();
        }

        [Test]
        public void Calculate_WithNegativeMonths_ShouldThrowException()
        {
            var monetaryValue = 5000;
            var month = 0;

            Assert.Throws<InvalidDataException>(() => _cdbService.Calculate(monetaryValue, month));
        }
    }
}