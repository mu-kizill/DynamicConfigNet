using System.Collections.Generic;
using System.Threading.Tasks;

namespace ConfigurationReaderLib
{
    public interface IConfigRepository
    {
        Task<List<ConfigItem>> GetActiveConfigurationsAsync(string applicationName);
    }
}
