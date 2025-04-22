package configs

// Infra
type DB struct {
	User         string   `mapstructure:"user"`
	Password     string   `mapstructure:"password"`
	SourceAddrs  []string `mapstructure:"sourceAddrs"`
	ReplicaAddrs []string `mapstructure:"replicaAddrs"`
	DBName       string   `mapstructure:"dbName"`
	FilePath     string   `mapstructure:"filePath"`
}

type Redis struct {
	MasterName    string   `mapstructure:"masterName"`
	SentinelAddrs []string `mapstructure:"sentinelAddrs"`
}

type Kafka struct {
	Brokers []string `mapstructure:"brokers"`
}

// Auth
type Google struct {
	ClientID     string   `mapstructure:"client_id"`
	ClientSecret string   `mapstructure:"client_secret"`
	RedirectURL  string   `mapstructure:"redirect_url"`
	Scopes       []string `mapstructure:"scopes"`
}

type Kakao struct {
	ClientID     string   `mapstructure:"client_id"`
	ClientSecret string   `mapstructure:"client_secret"`
	RedirectURL  string   `mapstructure:"redirect_url"`
	Scopes       []string `mapstructure:"scopes"`
}

type Log struct {
	Level       string `mapstructure:"level"`
	HistoryType string `mapstructure:"historyType"`
}

type Sentry struct {
	Dsn string `mapstructure:"dsn"`
}

type Server struct {
	Profile string `mapstructure:"profile"`
	Port    string `mapstructure:"port"`
}

type App struct {
	Version   string `mapstructure:"version"`
	TxTimeout int    `mapstructure:"txTimeout"`
	LogLevel  string `mapstructure:"logLevel"`
}

type Infra struct {
	DB     DB     `mapstructure:"db"`
	Redis  Redis  `mapstructure:"redis"`
	Kafka  Kafka  `mapstructure:"kafka"`
	Sentry Sentry `mapstructure:"sentry"`
}

type Auth struct {
	Google Google `mapstructure:"google"`
	Kakao  Kakao  `mapstructure:"kakao"`
}

type Config struct {
	Server Server
	App    App
	Infra  Infra
	Auth   Auth
}
