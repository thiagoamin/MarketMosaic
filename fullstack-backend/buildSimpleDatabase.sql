-- DROP tables from complex script, in case it was run before
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

-- DROP simple tables
DROP TABLE IF EXISTS stock_issued_by;
DROP TABLE IF EXISTS stock_marketcap;
DROP TABLE IF EXISTS stock_type;
DROP TABLE IF EXISTS company_operates_in;
DROP TABLE IF EXISTS sector;

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
