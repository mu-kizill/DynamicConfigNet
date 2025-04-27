using ConfigurationReaderLib;
using System.Reflection;

public class ConfigurationReaderForTest : DynamicConfigurationReader
{
    public ConfigurationReaderForTest(string appName, IConfigRepository mockRepo, int refreshIntervalMs)
        : base(appName, "FAKE-CONNECTION", refreshIntervalMs)
    {
        typeof(DynamicConfigurationReader)
            .GetField("_repository", BindingFlags.NonPublic | BindingFlags.Instance)
            ?.SetValue(this, mockRepo);

        var method = typeof(DynamicConfigurationReader)
            .GetMethod("LoadConfigurationsAsync", BindingFlags.NonPublic | BindingFlags.Instance);

        method?.Invoke(this, null);
    }
}
