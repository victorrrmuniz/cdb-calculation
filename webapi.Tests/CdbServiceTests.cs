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
        public void Calculate_WithValidDate_ShouldReturnCorrectResults()
        {
            var monetaryValue = 1000;
            var month = 6;

            var result = _cdbService.Calculate(monetaryValue, month);

            Assert.That(result, Is.Not.Null);
            Assert.That(result.GrossValue, Is.EqualTo(1059.76).Within(0.05));
            Assert.That(result.NetValue, Is.EqualTo(1046.31).Within(0.05));
        }

        [Test]
        [TestCase(-1000, 6)]
        [TestCase(1000, 0)]
        [TestCase(-1000, 0)]
        public void Calculate_WithInvalidMonetaryValueOrMonths_ShouldThrowException(double monetaryValue, int month)
        {
            Assert.Throws<InvalidDataException>(() => _cdbService.Calculate(monetaryValue, month));
        }


        [Test]
        [TestCase(10_000_000_000, 360)]
        [TestCase(20_000_000_000, 720)]
        public void Calculate_WithHighMonetaryValueAndMonths_ShouldNotThrowException(double monetaryValue, int month)
        {
            var result = _cdbService.Calculate(monetaryValue, month);

            Assert.That(result, Is.Not.Null);
            Assert.DoesNotThrow(() =>
                _cdbService.Calculate(monetaryValue, month)
            );
        }
    }
}