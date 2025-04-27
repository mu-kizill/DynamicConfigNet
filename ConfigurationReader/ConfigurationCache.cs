using System.Collections.Concurrent;

namespace ConfigurationReaderLib;

public class ConfigurationCache
{
    private ConcurrentDictionary<string, ConfigItem> _configMap = new();

    public void UpdateCache(IEnumerable<ConfigItem> configs)
    {
        _configMap = new ConcurrentDictionary<string, ConfigItem>(
            configs.ToDictionary(c => c.Name, c => c)
        );
    }

    public bool TryGet(string key, out ConfigItem item)
    {
        return _configMap.TryGetValue(key, out item);
    }
}
