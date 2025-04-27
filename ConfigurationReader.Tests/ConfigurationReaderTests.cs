using Xunit;
using Moq;
using ConfigurationReaderLib;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

public class ConfigurationReaderTests : IDisposable
{
    private readonly ConfigurationReaderForTest _reader;

    public ConfigurationReaderTests()
    {
        var mockRepo = new Mock<IConfigRepository>();

        mockRepo.Setup(r => r.GetActiveConfigurationsAsync("SERVICE-A"))
            .ReturnsAsync(new List<ConfigItem>
            {
                new ConfigItem { Name = "SiteName", Type = "string", Value = "soty.io" },
                new ConfigItem { Name = "IsFeatureEnabled", Type = "bool", Value = "true" },
                new ConfigItem { Name = "RetryCount", Type = "int", Value = "3" }
            });

        _reader = new ConfigurationReaderForTest("SERVICE-A", mockRepo.Object, 10000);
        Task.Delay(100).Wait(); // cache yüklemesi için
    }

    [Fact]
    public void GetValue_ShouldReturnCorrectTypedValue()
    {
        string site = _reader.GetValue<string>("SiteName");
        bool feature = _reader.GetValue<bool>("IsFeatureEnabled");
        int retry = _reader.GetValue<int>("RetryCount");

        Assert.Equal("soty.io", site);
        Assert.True(feature);
        Assert.Equal(3, retry);
    }

    [Fact]
    public void GetValue_InvalidKey_ShouldThrow()
    {
        Assert.Throws<KeyNotFoundException>(() => _reader.GetValue<string>("NotExist"));
    }

    public void Dispose()
    {
        _reader?.Dispose();
    }
}
