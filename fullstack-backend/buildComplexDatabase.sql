DROP TABLE IF EXISTS has_power;
DROP TABLE IF EXISTS nav_hasnav;
DROP TABLE IF EXISTS price_hasprice;
DROP TABLE IF EXISTS options_derivativeof;
DROP TABLE IF EXISTS mutual_fund;
DROP TABLE IF EXISTS index_fund;
DROP TABLE IF EXISTS fund_owns;
DROP TABLE IF EXISTS own_fund;
DROP TABLE IF EXISTS own_stock;
DROP TABLE IF EXISTS listed_on;
DROP TABLE IF EXISTS exchange;
DROP TABLE IF EXISTS decisionmaker_isalso;
DROP TABLE IF EXISTS shareholder;
DROP TABLE IF EXISTS fund_begantradeon;
DROP TABLE IF EXISTS stock_issued_by;
DROP TABLE IF EXISTS Stock_Issues_IPO_Date;
DROP TABLE IF EXISTS stock;
DROP TABLE IF EXISTS stock_marketcap;
DROP TABLE IF EXISTS stock_type;
DROP TABLE IF EXISTS stock_issued_by;
DROP TABLE IF EXISTS Date;
DROP TABLE IF EXISTS company_operates_in;
DROP TABLE IF EXISTS sector;
DROP VIEW IF EXISTS stock_view;


CREATE TABLE Date
(
    day   CHAR(2) NOT NULL,
    month CHAR(2) NOT NULL,
    year  CHAR(4) NOT NULL,
    PRIMARY KEY (day, month, year)
);


CREATE TABLE sector
(
    sector_name      VARCHAR(32),
    num_of_companies SMALLINT,
    market_weight    FLOAT(24),
    PRIMARY KEY (sector_name)
);

CREATE TABLE company_operates_in
(
    name        VARCHAR(30),
    employees   INT,
    revenue     BIGINT,
    sector_name VARCHAR(32) NOT NULL,
    PRIMARY KEY (name),
    FOREIGN KEY (sector_name) REFERENCES sector (sector_name)
);

CREATE TABLE Stock_Issues_IPO_Date
(
    company_name VARCHAR(30),
    Symbol       CHAR(10),
    IPO_Day      CHAR(2),
    IPO_Month    CHAR(2),
    IPO_Year     CHAR(4),
    PRIMARY KEY (company_name, Symbol),
    FOREIGN KEY (company_name) REFERENCES company_operates_in (name)
        ON DELETE CASCADE,
    FOREIGN KEY (IPO_Day, IPO_Month, IPO_Year) REFERENCES date (day, month, year),
    INDEX (Symbol)
);

CREATE TABLE stock_type
(
    symbol CHAR(10) PRIMARY KEY,
    type   CHAR(30)
);

CREATE TABLE stock_marketcap
(
    symbol     CHAR(10) PRIMARY KEY,
    market_cap BIGINT,
    FOREIGN KEY (symbol) REFERENCES stock_type (symbol)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE stock_issued_by
(
    isin         CHAR(12),
    symbol       CHAR(10),
    company_name VARCHAR(30),
    PRIMARY KEY (isin),
    FOREIGN KEY (symbol) REFERENCES stock_marketcap (symbol)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (company_name) REFERENCES company_operates_in (name)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE Fund_beganTradeOn
(
    name          VARCHAR(64),
    company       VARCHAR(32),
    expense_ratio FLOAT(24),
    trade_day     CHAR(2) NOT NULL,
    trade_month   CHAR(2) NOT NULL,
    trade_year    CHAR(4) NOT NULL,
    PRIMARY KEY (name, company),
    FOREIGN KEY (trade_day, trade_month, trade_year)
        REFERENCES date (day, month, year)
);

CREATE TABLE Shareholder
(
    SIN       CHAR(12) PRIMARY KEY,
    name      VARCHAR(32),
    brokerage VARCHAR(32),
    address   VARCHAR(256),
    CONSTRAINT UNIQUE SIN (SIN)
);

CREATE TABLE DecisionMaker_isAlso
(
    first_name  VARCHAR(32),
    last_name   VARCHAR(32),
    address     VARCHAR(256),
    appointment VARCHAR(128),
    SIN         CHAR(12),
    PRIMARY KEY (first_name, last_name, address),
    FOREIGN KEY (SIN) REFERENCES Shareholder (SIN) ON DELETE SET NULL,
    CONSTRAINT UNIQUE Person (first_name, last_name, address, SIN)
);

CREATE TABLE Exchange
(
    exchange_name VARCHAR(16) PRIMARY KEY,
    market_share  INTEGER,
    country       VARCHAR(16),
    CONSTRAINT UNIQUE exchange_name (exchange_name)
);

CREATE TABLE Listed_on
(
    ISIN          CHAR(12),
    exchange_name VARCHAR(16),
    PRIMARY KEY (ISIN, exchange_name),
    FOREIGN KEY (ISIN) REFERENCES stock_issued_by (isin)
        ON DELETE CASCADE,
    FOREIGN KEY (exchange_name) REFERENCES Exchange (exchange_name)
);

CREATE TABLE own_stock
(
    SIN   CHAR(12),
    ISIN  CHAR(12),
    day   CHAR(2),
    month CHAR(2),
    year  CHAR(4),
    PRIMARY KEY (SIN, ISIN, day, month, year),
    FOREIGN KEY (SIN) REFERENCES Shareholder (SIN),
    FOREIGN KEY (ISIN) REFERENCES stock_issued_by (isin)
        ON DELETE CASCADE,
    FOREIGN KEY (day, month, year) REFERENCES Date (day, month, year)
);

CREATE TABLE own_fund
(
    SIN       CHAR(12),
    fund_name VARCHAR(64),
    company   VARCHAR(32),
    day       CHAR(2),
    month     CHAR(2),
    year      CHAR(4),
    PRIMARY KEY (SIN, fund_name, company, day, month, year),
    FOREIGN KEY (SIN) REFERENCES Shareholder (SIN),
    FOREIGN KEY (fund_name, company) REFERENCES Fund_beganTradeOn (name, company),
    FOREIGN KEY (day, month, year) REFERENCES Date (day, month, year)
);

CREATE TABLE fund_owns
(
    ISIN       CHAR(12),
    fund_name  VARCHAR(64),
    company    VARCHAR(32),
    day        CHAR(2),
    month      CHAR(2),
    year       CHAR(4),
    proportion FLOAT(4),
    PRIMARY KEY (ISIN, fund_name, company, day, month, year),
    FOREIGN KEY (ISIN) REFERENCES stock_issued_by (isin)
        ON DELETE CASCADE,
    FOREIGN KEY (fund_name, company) REFERENCES Fund_beganTradeOn (name, company),
    FOREIGN KEY (day, month, year) REFERENCES Date (day, month, year)
);

CREATE TABLE index_fund
(
    name           VARCHAR(64),
    company        VARCHAR(32),
    tracking_index VARCHAR(16),
    PRIMARY KEY (name, company),
    FOREIGN KEY (name, company) REFERENCES Fund_beganTradeOn (name, company)
);

CREATE TABLE mutual_fund
(
    name    VARCHAR(64),
    company VARCHAR(32),
    manager VARCHAR(32),
    PRIMARY KEY (name, company),
    FOREIGN KEY (name, company) REFERENCES Fund_beganTradeOn (name, company)
);

CREATE TABLE options_derivativeof
(
    ISIN         CHAR(12),
    expiry_date  DATE,
    strike_price INT,
    type         VARCHAR(16),
    is_expired   BIT,
    PRIMARY KEY (expiry_date, strike_price, type),
    FOREIGN KEY (ISIN) references stock_issued_by (isin)
        ON DELETE CASCADE
);

CREATE TABLE price_hasprice
(
    ISIN           CHAR(12),
    days_since_ipo INT,
    high           INT,
    low            INT,
    open           INT,
    close          INT,
    volume         INT,
    PRIMARY KEY (days_since_ipo, ISIN),
    FOREIGN KEY (ISIN) REFERENCES stock_issued_by (isin)
        ON DELETE CASCADE
);

CREATE TABLE nav_hasnav
(
    name                 VARCHAR(64),
    company              VARCHAR(32),
    days_since_inception INT,
    aum                  INT,
    Nav_per_share        FLOAT(24),
    PRIMARY KEY (days_since_inception, name, company),
    foreign key (name, company) REFERENCES Fund_beganTradeOn (name, company)
);

CREATE TABLE has_power
(
    first_name     VARCHAR(32),
    last_name      VARCHAR(32),
    address        VARCHAR(256),
    company_name   VARCHAR(30),
    duration_years INT,
    PRIMARY KEY (first_name, last_name, address, company_name),
    FOREIGN KEY (first_name, last_name, address) REFERENCES DecisionMaker_isAlso (first_name, last_name, address),
    FOREIGN KEY (company_name) REFERENCES company_operates_in (name)
        ON DELETE CASCADE
);



CREATE VIEW stock_view AS
SELECT
    si.isin,
    si.symbol,
    sm.market_cap,
    st.type,
    si.company_name
FROM
    stock_issued_by si
        JOIN
    stock_marketcap sm ON si.symbol = sm.symbol
        JOIN
    stock_type st ON si.symbol = st.Symbol;



INSERT INTO Date(day, month, year)
VALUES ("19", "01", "1944"),
       ("01", "01", "1980"),
       ("17", "03", "1980"),
       ("13", "03", "1986"),
       ("06", "11", "1978"),
       ("15", "05", "1997"),
       ("19", "08", "2004"),
       ("18", "05", "2012"),
       ("01", "01", "2024"),
       ("02", "01", "2024"),
       ("03", "01", "2024"),
       ("04", "01", "2024"),
       ("05", "01", "2024"),
       ("29", "02", "2024"),
       ("01", "03", "2024"),
       ("02", "03", "2024"),
       ("03", "03", "2024"),
       ("04", "03", "2024");


INSERT INTO sector(sector_name, num_of_companies, market_weight)
VALUES ("technology", 788, 29.6),
       ("financials", 1399, 13.0),
       ("healthcare", 1218, 12.8),
       ("energy", 253, 3.7),
       ("industrials", 649, 8.7);

INSERT INTO company_operates_in(name, employees, revenue, sector_name)
VALUES ("Apple Inc", 161000, 383285000000, "technology"),
       ("JPMorgan Chase & Co", 309926, 170588000000, "financials"),
       ("Pfizer Inc", 88000, 58496000000, "healthcare"),
       ("Chevron Corporation", 45600, 194799000000, "energy"),
       ("General Electric Company", 125000, 67954000000, "industrials"),
       ("Amazon.com Inc", 200000, 2500000000, "technology"),
       ("Microsoft Corporation", 145300, 21200000000, "technology"),
       ("Alphabet Inc", 132000, 23000000000, "technology"),
       ("Facebook Inc", 98000, 15000000000, "technology");

INSERT INTO Stock_Issues_IPO_Date (company_name, Symbol, IPO_Day, IPO_Month, IPO_Year)
VALUES ("Apple Inc", "AAPL", "01", "01", "1980"),
       ("Amazon.com Inc", "AMZN", "15", "05", "1997"),
       ("Microsoft Corporation", "MSFT", "13", "03", "1986"),
       ("Alphabet Inc", "GOOGL", "19", "08", "2004"),
       ("Facebook Inc", "FB", "18", "05", "2012"),
       ("Pfizer Inc", "PFE", "19", "01", "1944"),
       ("JPMorgan Chase & Co", "JPM.PR.C", "06", "11", "1978"),
       ("JPMorgan Chase & Co", "JPM", "06", "11", "1978"),
       ("Chevron Corporation", "CVX", "17", "03", "1980");

INSERT INTO stock_type (symbol, type)
VALUES ("AAPL", "common"),
       ("AMZN", "common"),
       ("MSFT", "common"),
       ("GOOGL", "common"),
       ("FB", "common"),
       ("JPM.PR.C", "preferred"),
       ("JPM", "common"),
       ("PFE", "common"),
       ("CVX", "common");

INSERT INTO stock_marketcap (symbol, market_cap)
VALUES ("AAPL", 2290000000000),
       ("AMZN", 1730000000000),
       ("MSFT", 1800000000000),
       ("GOOGL", 1600000000000),
       ("FB", 1000000000000),
       ("JPM", 531080000000),
       ("JPM.PR.C", 531080000000),
       ("PFE", 152690000000),
       ("CVX", 282940000000);

INSERT INTO stock_issued_by (isin, symbol, company_name)
VALUES ("US0378331005", "AAPL", "Apple Inc"),
       ("US0231351067", "AMZN", "Amazon.com Inc"),
       ("US5949181045", "MSFT", "Microsoft Corporation"),
       ("US02079K3059", "GOOGL", "Alphabet Inc"),
       ("US30303M1027", "FB", "Facebook Inc"),
       ("US48128B6487", "JPM.PR.C", "JPMorgan Chase & Co"),
       ("US46625H1005", "JPM", "JPMorgan Chase & Co"),
       ("US7170811035", "PFE", "Pfizer Inc"),
       ("US1667641005", "CVX", "Chevron Corporation");

INSERT INTO Fund_beganTradeOn(name, company, expense_ratio, trade_day, trade_month, trade_year)
VALUES ("Vanguard Total Stock Market Index Fund", "Vanguard Group Inc.", 0.10, "29", "02", "2024"),
       ("Fidelity Contrafund", "Fidelity Investments", 0.15, "02", "03", "2024"),
       ("American Funds Growth Fund of America", "Capital Group", 0.20, "03", "03", "2024"),
       ("PIMCO Total Return Fund", "PIMCO", 0.12, "04", "01", "2024"),
       ("T. Rowe Price Blue Chip Growth Fund", "T. Rowe Price", 0.18, "04", "03", "2024");

INSERT INTO Shareholder(SIN, Name, Brokerage, Address)
VALUES ("TIMCOOK54321", "Tim Cook", "UBS", "1 Apple Park Way, Cupertino, CA, USA"),
       ("JOHNSMITH123", "John Smith", "Wealthsimple", "1961 E Mall, Vancouver, BC, Canada"),
       ("BRICONNORS02", "Brian Connors", "Fidelity", "2053 Main Mall, Vancouver, BC, Canada"),
       ("YILONGMA6543", "Yilong Ma", "Tesla Bank", "1 Tesla Road, Austin, TX, USA"),
       ("NANPELOSI123", "Nancy Pelosi", "Blackstone", "1600 Pennsylvania Avenue NW, Washington, DC, USA");

INSERT INTO DecisionMaker_isAlso(First_name, Last_name, Address, Appointment, SIN)
VALUES ("Tim", "Cook", "1 Apple Park Way, Cupertino, CA, USA", "CEO of Apple Inc", "TIMCOOK54321"),
       ("Nancy", "Pelosi", "1600 Pennsylvania Avenue NW, Washington, DC, USA", "Speaker Emerita of the House",
        "NANPELOSI123"),
       ("Michael", "Regan", "1200 6th Ave #155, Seattle, WA, USA", "EPA Administrator", NULL),
       ("Xavier", "Becerra", "200 Independence Ave SW, Washington, DC, USA", "Secretary of Health and Human Services",
        NULL),
       ("Susan", "Wagner", "1958 Main Mall, Vancouver, BC, Canada", "Director at Apple", NULL);

INSERT INTO Exchange (exchange_name, market_share, country)
VALUES ("NASDAQ", 5000, "USA"),
       ("NYSE", 10000, "USA");

INSERT INTO listed_on(ISIN, exchange_name)
VALUES ("US0378331005", "NASDAQ"),
       ("US48128B6487", "NYSE"),
       ("US46625H1005", "NYSE"),
       ("US7170811035", "NYSE"),
       ("US1667641005", "NYSE");

INSERT INTO own_Stock(SIN, ISIN, Day, Month, Year)
VALUES ("TIMCOOK54321", "US0378331005", "29", "02", "2024"),
       ("JOHNSMITH123", "US46625H1005", "01", "03", "2024"),
       ("BRICONNORS02", "US7170811035", "03", "03", "2024"),
       ("YILONGMA6543", "US7170811035", "03", "03", "2024"),
       ("NANPELOSI123", "US1667641005", "04", "03", "2024");

INSERT INTO own_fund(SIN, fund_name, company, day, month, year)
VALUES ("TIMCOOK54321", "Vanguard Total Stock Market Index Fund", "Vanguard Group Inc.", "01", "03", "2024"),
       ("JOHNSMITH123", "Fidelity Contrafund", "Fidelity Investments", "02", "03", "2024"),
       ("BRICONNORS02", "American Funds Growth Fund of America", "Capital Group", "03", "03", "2024"),
       ("YILONGMA6543", "PIMCO Total Return Fund", "PIMCO", "03", "03", "2024"),
       ("NANPELOSI123", "T. Rowe Price Blue Chip Growth Fund", "T. Rowe Price", "04", "03", "2024");

INSERT INTO fund_owns(isin, fund_name, company, day, month, year, proportion)
VALUES ("US0378331005", "Vanguard Total Stock Market Index Fund", "Vanguard Group Inc.", "01", "01", "2024", 0.25),
       ("US48128B6487", "Fidelity Contrafund", "Fidelity Investments", "02", "01", "2024", 0.20),
       ("US7170811035", "American Funds Growth Fund of America", "Capital Group", "03", "01", "2024", 0.15),
       ("US0231351067", "PIMCO Total Return Fund", "PIMCO", "04", "01", "2024", 0.30),
       ("US1667641005", "T. Rowe Price Blue Chip Growth Fund", "T. Rowe Price", "05", "01", "2024", 0.10);

INSERT INTO index_fund(name, company, tracking_index)
VALUES ("Vanguard Total Stock Market Index Fund", "Vanguard Group Inc.", "S&P 500");

INSERT INTO mutual_fund(name, company, manager)
VALUES ("Fidelity Contrafund", "Fidelity Investments", "Fidelity"),
       ("American Funds Growth Fund of America", "Capital Group", "Alice Johnson"),
       ("PIMCO Total Return Fund", "PIMCO", "PIMCO"),
       ("T. Rowe Price Blue Chip Growth Fund", "T. Rowe Price", "T. Rowe Price");

INSERT INTO Options_derivativeOf(isin, expiry_date, strike_price, type, is_expired)
VALUES ("US0378331005", DATE ("2024-04-19"), 18000, "call", 0),
       ("US0378331005", DATE ("2024-04-19"), 18500, "call", 0),
       ("US0378331005", DATE ("2024-04-19"), 18000, "put", 0),
       ("US0378331005", DATE ("2024-02-28"), 17000, "call", 1),
       ("US46625H1005", DATE ("2024-04-05"), 19000, "put", 0);

INSERT INTO Price_hasPrice(ISIN, Days_Since_IPO, High, Low, Open, Close, Volume)
VALUES ("US0378331005", 15784, 18257, 17953, 18127, 18075, 135377101),
       ("US48128B6487", 16700, 25.24, 25.14, 25.22, 25.15, 20000),
       ("US46625H1005", 16700, 186.44, 185.10, 185.70, 185.29, 6165000),
       ("US7170811035", 29840, 26.90, 26.51, 26.60, 26.85, 45000000),
       ("US1667641005", 16058, 154.35, 152.25, 153.05, 152.81, 7451000);

INSERT INTO nav_hasNav(name, company, days_since_inception, aum, nav_per_share)
VALUES ("Vanguard Total Stock Market Index Fund", "Vanguard Group Inc.", 365, 100000000, 250.75),
       ("Fidelity Contrafund", "Fidelity Investments", 180, 75000000, 150.25),
       ("American Funds Growth Fund of America", "Capital Group", 730, 50000000, 125.50),
       ("PIMCO Total Return Fund", "PIMCO", 1095, 30000000, 75.80),
       ("T. Rowe Price Blue Chip Growth Fund", "T. Rowe Price", 730, 85000000, 200.35);

INSERT INTO has_Power(First_name, Last_name, Address, Company_Name, Duration_Years)
VALUES ("Tim", "Cook", "1 Apple Park Way, Cupertino, CA, USA", "Apple Inc", 14),
       ("Susan", "Wagner", "1958 Main Mall, Vancouver, BC, Canada", "Apple Inc", 5);
