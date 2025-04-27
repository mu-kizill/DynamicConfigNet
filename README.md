Dynamic Configuration System (.NET + React + MSSQL)

Bu proje, .NET tabanlı mikroservislerin merkezi bir noktadan konfigürasyon verisi alabilmesini sağlayan dinamik bir sistem sunar.
Konfigürasyon değerleri MSSQL veritabanında tutulur, bir React tabanlı arayüzle yönetilir ve API aracılığıyla erişilebilir hale gelir.
Kütüphane, uygulama çalışırken değişen değerleri belirli periyotlarla çekerek sistemin kesintisiz çalışmasını sağlar.

: Özellikler

Tip güvenli konfigürasyon erişimi: T GetValue<T>(string key)

DLL olarak tüm .NET projelerine eklenebilir

Konfigürasyon değerleri cache'de tutulur ve periyodik olarak yenilenir

React + Tailwind tabanlı yönetim paneli

Docker-compose ile tam sistem ayağa kalkar

MSSQL veritabanı desteği

Unit test kapsamlı ve izole çalışabilir

📄 Proje Yapısı

DynamicConfigNet/
├── ConfigurationReader/           # Dinamik DLL kütüphanesi
├── ConfigurationReader.Tests/     # Unit testler (xUnit + Moq)
├── ConfigApi/                     # ASP.NET Core 8 Web API
├── config-panel/                  # React + Vite + Tailwind arayüz
├── docker-compose.yml             # MSSQL + API + Panel
├── README.md                      # Bu dosya

 Kullanım : 

var reader = new DynamicConfigurationReader("SERVICE-A", "<connection-string>", 5000);
string siteName = reader.GetValue<string>("SiteName");
bool isActive = reader.GetValue<bool>("FeatureEnabled");

Yalnızca IsActive = 1 olan kayıtlar dönülür.


🔮 Testler

dotnet test

Doğru tip dönüş kontrolü (string, int, bool, double)

Yanlış key için KeyNotFoundException

Tip uyuşmazlığında InvalidCastException

Total tests: 3 | Passed: 3 | Failed: 0

 Mimarisi : 

[ React Panel ] → [ ConfigApi ] → [ MSSQL ]
                         ↑
               [ ConfigurationReader.dll ]

Arayüz ConfigApi üzerinden veriye erişir

API, MSSQL'den veriyi çeker ve döner

Reader DLL, uygulama içinden cache + polling ile veri okur

 Gereksinimler : 

.NET 8 SDK

Node.js 18+


## 🛢 Veritabanı Kurulumu

Proje, MSSQL’in bilgisayarda kurulu olması varsayımıyla çalışmaktadır. Docker kullanılmamaktadır.

### 1. MSSQL Express veya LocalDB kurulu olmalı

Örnek instance ismi:

DESKTOP-BEMHJK7\SQLEXPRESS01


> Visual Studio ile birlikte gelen MSSQL Express yeterlidir.

---

### 2. `ConfigApi` içindeki `appsettings.Development.json` dosyasını kontrol edin:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=DESKTOP-BEMHJK7\\SQLEXPRESS01;Database=ConfigurationsDb;Trusted_Connection=True;TrustServerCertificate=True;"
}


Klonlama

git clone https://github.com/kullaniciadi/DynamicConfigNet.git
cd DynamicConfigNet
dotnet build
