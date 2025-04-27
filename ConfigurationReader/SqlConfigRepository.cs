using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace ConfigurationReaderLib;

public class SqlConfigRepository : IConfigRepository
{
    private readonly string _connectionString;

    public SqlConfigRepository(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<List<ConfigItem>> GetActiveConfigurationsAsync(string applicationName)
    {
        var result = new List<ConfigItem>();

        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();

        string query = "SELECT Name, Type, Value FROM Configurations WHERE ApplicationName = @App AND IsActive = 1";

        using var command = new SqlCommand(query, connection);
        command.Parameters.AddWithValue("@App", applicationName);

        using var reader = await command.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            result.Add(new ConfigItem
            {
                Name = reader.GetString(0),
                Type = reader.GetString(1),
                Value = reader.GetString(2)
            });
        }

        return result;
    }
}
