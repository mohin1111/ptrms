# Trading Exchange Data Fields Documentation

This document collates field definitions and descriptions across multiple trading exchanges and report types.

## Table of Contents

1. [NSEEQ (NSE Equity)](#nseeq-nse-equity)
2. [NSECD (NSE Currency Derivatives)](#nsecd-nse-currency-derivatives)
3. [NSEFO (NSE Futures & Options)](#nsefo-nse-futures--options)
4. [MCX (Multi Commodity Exchange)](#mcx-multi-commodity-exchange)

---

## NSEEQ (NSE Equity)

### Summary Report

**Exchange**

The trading venue where the positions and risk values are applicable,

**Delta**

The overall delta representing price sensitivity of the total positions,

**FutDelta**

The delta contribution coming specifically from futures positions,

**OptDelta**

The delta contribution coming specifically from options positions,

**Vega**

Sensitivity of the position value to changes in implied volatility,

**Gamma**

Sensitivity of delta to changes in the underlying price,

**Theta**

Time decay impact on the value of the positions,

**MTM**

Mark-to-Market profit or loss on all open positions,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**RealisedMTM**

Profit or loss that has been booked from closed positions,

**UnRealisedMTM**

Profit or loss on open positions that is not yet booked,

**DayRealisedMTM**

Realised profit or loss generated during the current trading day,

**DayUnRealisedMTM**

Unrealised profit or loss generated during the current trading day,

**DayMTM**

Total Mark-to-Market profit or loss for the current trading day,

**MarginLimit**

The maximum margin allowed based on available collateral,

**ConcentrationMargin**

Additional margin charged for holding highly concentrated positions,

**NetCollateralLimit**

The total collateral value available after applicable haircuts and adjustments,

**MarginUtilized**

The actual margin amount currently blocked for open positions,

**MarginUtilizedPerc**

The percentage of the total margin limit that is currently being used,

**AvailableCollateral**

Collateral still free and available after margin utilization,

**InitialMargin**

The margin required to initiate positions,

**ExposureMargin**

Additional margin charged for exposure to market movements,

**SpreadBenefit**

Margin reduction benefit received due to offsetting or spread positions,

**VarMargin**

Value at Risk margin required based on market risk of positions,

**DayPayIn**

Funds required to be paid in for the trading day,

**DayPayOut**

Funds receivable for the trading day,

**AdSurMargin**

Additional or surveillance margin imposed by the exchange,

**MinMargin**

Minimum margin required to maintain open positions,

**TenderMargin**

Additional margin required for tender period obligations,

**AdditionalMargin**

Any extra margin imposed over and above standard requirements,

**SpecialMargin**

Special margin imposed due to specific risk or regulatory conditions,

**FullMrgnExcldSprdBenft**

Total margin requirement without considering spread benefits,

**NxtTenderDayRqrdMargin**

Margin required to be maintained for the next tender day,

**NetPremium**

Net option premium payable or receivable.

---

### Username Wise Report

**UserName**

The name or identifier of the client account,

**Delta**

The overall delta representing price sensitivity of the client’s total positions,

**FutDelta**

The delta contribution coming specifically from futures positions,

**OptDelta**

The delta contribution coming specifically from options positions,

**Vega**

Sensitivity of the client’s position value to changes in implied volatility,

**Gamma**

Sensitivity of delta to changes in the underlying price,

**Theta**

Time decay impact on the value of the client’s positions,

**MTM**

Mark-to-Market profit or loss on all open positions,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**RealisedMTM**

Profit or loss that has been booked from closed positions,

**UnRealisedMTM**

Profit or loss on open positions that is not yet booked,

**DayRealisedMTM**

Realised profit or loss generated during the current trading day,

**DayUnRealisedMTM**

Unrealised profit or loss generated during the current trading day,

**DayMTM**

Total Mark-to-Market profit or loss for the current trading day,

**CollateralLimit**

The total collateral value considered before adjustments or haircuts,

**ConcentrationMargin**

Additional margin charged for holding highly concentrated positions,

**NetCollateralLimit**

The total collateral value available after applicable haircuts and adjustments,

**MarginUtilized**

The actual margin amount currently blocked for open positions,

**MarginUtilizedPerc**

The percentage of the total margin limit that is currently being used,

**AvailableCollateral**

Collateral still free and available after margin utilization,

**TotalClientLedger**

The net ledger balance of the client including funds and obligations,

**PledgeCollateral**

Collateral value obtained through pledged securities,

**InitialMargin**

The margin required to initiate positions,

**ExposureMargin**

Additional margin charged for exposure to market movements,

**SpreadBenefit**

Margin reduction benefit received due to offsetting or spread positions,

**VarMargin**

Value at Risk margin required based on market risk of positions,

**DayPayIn**

Funds required to be paid in by the client for the trading day,

**DayPayOut**

Funds receivable by the client for the trading day,

**AdSurMargin**

Additional or surveillance margin imposed by the exchange,

**MinMargin**

Minimum margin required to maintain open positions,

**ExrcAssgndValue**

The value of positions that have been exercised or assigned,

**TenderMargin**

Additional margin required for tender period obligations,

**AdditionalMargin**

Any extra margin imposed over and above standard requirements,

**SpecialMargin**

Special margin imposed due to specific risk or regulatory conditions,

**FullMrgnExcldSprdBenft**

Total margin requirement without considering spread benefits,

**NxtTenderDayRqrdMargin**

Margin required to be maintained for the next tender day,

**NetPremium**

Net option premium payable or receivable.

---

### Client Wise Report

**ClientId**

A unique identifier assigned to the client,

**ClientName**

The registered name of the client,

**ClientType**

The classification of the client such as retail, institutional, or proprietary,

**CPCode**

The clearing participant or counterparty code associated with the client,

**NetValue**

The client’s overall net worth including ledger balance, collateral, and MTM,

**Delta**

The overall delta representing price sensitivity of the client’s total positions,

**FutDelta**

The delta contribution coming specifically from futures positions,

**OptDelta**

The delta contribution coming specifically from options positions,

**Vega**

Sensitivity of the client’s position value to changes in implied volatility,

**Gamma**

Sensitivity of delta to changes in the underlying price,

**Theta**

Time decay impact on the value of the client’s positions,

**MTM**

Mark-to-Market profit or loss on all open positions,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**RealisedMTM**

Profit or loss that has been booked from closed positions,

**UnRealisedMTM**

Profit or loss on open positions that is not yet booked,

**DayRealisedMTM**

Realised profit or loss generated during the current trading day,

**DayUnRealisedMTM**

Unrealised profit or loss generated during the current trading day,

**DayMTM**

Total Mark-to-Market profit or loss for the current trading day,

**ConcentrationMargin**

Additional margin charged for holding highly concentrated positions,

**MarginUtilized**

The actual margin amount currently blocked for open positions,

**PledgeCollateral**

Collateral value obtained through pledged securities,

**CollateralForExposure**

Collateral value considered for exposure calculation,

**CollateralAvailable**

Collateral still free and available for further trading,

**CollateralMarginUtilPerc**

The percentage of collateral margin that is currently utilized,

**InitialMargin**

The margin required to initiate positions,

**ExposureMargin**

Additional margin charged for exposure to market movements,

**SpreadBenefit**

Margin reduction benefit received due to offsetting or spread positions,

**VarMargin**

Value at Risk margin required based on market risk of positions,

**DayPayIn**

Funds required to be paid in by the client for the trading day,

**DayPayOut**

Funds receivable by the client for the trading day,

**AdSurMargin**

Additional or surveillance margin imposed by the exchange,

**MinMargin**

Minimum margin required to maintain open positions,

**ExrcAssgndValue**

The value of positions that have been exercised or assigned,

**NetPremium**

Net option premium payable or receivable by the client,

**Brokerage**

Total brokerage charges applicable to the client,

**Expenses**

Other charges and expenses applied to the client account,

**OrgLedger**

The original ledger balance before adjustments or settlements,

**NetLedger**

The net ledger balance after brokerage, expenses, and settlements,

**AvailableExposure**

The remaining trading exposure available to the client,

**LedgerMarginUtilizedPerc**

The percentage of ledger margin that is currently utilized.

---

### Symbol Wise Report

**Symbol**

The trading symbol or instrument identifier,

**NetQty**

The net quantity held after offsetting all buy and sell positions,

**NetValue**

The total value of the net position based on price and quantity,

**Delta**

The overall delta representing price sensitivity of the position,

**FutDelta**

The delta contribution coming specifically from futures positions,

**OptDelta**

The delta contribution coming specifically from options positions,

**Vega**

Sensitivity of the position value to changes in implied volatility,

**Gamma**

Sensitivity of delta to changes in the underlying price,

**Theta**

Time decay impact on the value of the position,

**MTM**

Mark-to-Market profit or loss on the position,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**RealisedMTM**

Profit or loss that has been booked from closed trades,

**UnRealisedMTM**

Profit or loss on open positions that is not yet booked,

**DayRealisedMTM**

Realised profit or loss generated during the current trading day,

**DayUnRealisedMTM**

Unrealised profit or loss generated during the current trading day,

**DayMTM**

Total Mark-to-Market profit or loss for the current trading day,

**IV**

Implied volatility used for option pricing and margin calculation,

**ConcentrationMargin**

Additional margin charged due to high concentration in the symbol,

**TotalMargin**

The total margin required for the position,

**InitialMargin**

The margin required to initiate the position,

**ExposureMargin**

Additional margin charged for exposure to market movements,

**SpreadBenefit**

Margin reduction benefit received due to offsetting or spread positions,

**VarMargin**

Value at Risk margin required based on market risk of the position,

**DayPayIn**

Funds required to be paid in for the trading day due to the position,

**DayPayOut**

Funds receivable for the trading day due to the position,

**MinMargin**

Minimum margin required to maintain the position,

**ExrcAssgndValue**

The value of positions that have been exercised or assigned,

**TenderMargin**

Additional margin required for tender period obligations,

**AdditionalMargin**

Any extra margin imposed over and above standard requirements,

**SpecialMargin**

Special margin imposed due to specific risk or regulatory conditions,

**FullMrgnExcldSprdBenft**

Total margin requirement without considering spread benefits,

**NxtTenderDayRqrdMargin**

Margin required to be maintained for the next tender day,

**Brokerage**

Brokerage charges applicable to trades in the symbol,

**Expenses**

Other expenses or statutory charges related to the trades.

---

### Scrip Wise Report

**Scrip**

The trading scrip or instrument name,

**NetQty**

The net quantity held after offsetting all buy and sell trades,

**DayBuyQty**

The total quantity bought during the trading day,

**DaySellQty**

The total quantity sold during the trading day,

**BFNetQty**

The brought-forward net quantity from previous trading days,

**DayNetQty**

The net quantity generated during the current trading day,

**LTP**

The last traded price of the scrip,

**NetPrice**

The average net traded price of the position,

**StrikePrice**

The strike price applicable for option contracts,

**NetValue**

The total value of the net position based on price and quantity,

**Delta**

The overall delta representing price sensitivity of the position,

**FutDelta**

The delta contribution coming specifically from futures positions,

**OptDelta**

The delta contribution coming specifically from options positions,

**Vega**

Sensitivity of the position value to changes in implied volatility,

**Gamma**

Sensitivity of delta to changes in the underlying price,

**Theta**

Time decay impact on the value of the position,

**MTM**

Mark-to-Market profit or loss on the position,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**ExposureMargin**

Additional margin charged for exposure to market movements,

**SpreadBenefit**

Margin reduction benefit received due to offsetting or spread positions,

**VarMargin**

Value at Risk margin required based on market risk,

**MinMargin**

Minimum margin required to maintain the position,

**DayPayIn**

Funds required to be paid in for the trading day due to the position,

**DayPayOut**

Funds receivable for the trading day due to the position,

**PotentialLossUp**

Estimated potential loss if the price moves upward,

**PotentialLossDown**

Estimated potential loss if the price moves downward,

**ExrcAssgndValue**

The value of positions that have been exercised or assigned,

**RealisedMTM**

Profit or loss that has been booked from closed trades,

**UnRealisedMTM**

Profit or loss on open positions that is not yet booked,

**DayRealisedMTM**

Realised profit or loss generated during the current trading day,

**DayUnRealisedMTM**

Unrealised profit or loss generated during the current trading day,

**DayMTM**

Total Mark-to-Market profit or loss for the current trading day,

**IV**

Implied volatility used for option pricing and margin calculation,

**NetPremium**

Net option premium payable or receivable for the position,

**Brokerage**

Brokerage charges applicable to the trades,

**Expenses**

Other expenses or statutory charges related to the trades,

**TenderMargin**

Additional margin required for tender period obligations.

---

## NSECD (NSE Currency Derivatives)

### Summary Report

**Exchange**

The trading venue where the positions and risk values are applicable,

**Delta**

The overall delta representing price sensitivity of the total positions,

**FutDelta**

The delta contribution coming specifically from futures positions,

**OptDelta**

The delta contribution coming specifically from options positions,

**Vega**

Sensitivity of the position value to changes in implied volatility,

**Gamma**

Sensitivity of delta to changes in the underlying price,

**Theta**

Time decay impact on the value of the positions,

**MTM**

Mark-to-Market profit or loss on all open positions,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**RealisedMTM**

Profit or loss that has been booked from closed positions,

**UnRealisedMTM**

Profit or loss on open positions that is not yet booked,

**DayRealisedMTM**

Realised profit or loss generated during the current trading day,

**DayUnRealisedMTM**

Unrealised profit or loss generated during the current trading day,

**DayMTM**

Total Mark-to-Market profit or loss for the current trading day,

**MarginLimit**

The maximum margin allowed based on available collateral,

**ConcentrationMargin**

Additional margin charged for holding highly concentrated positions,

**NetCollateralLimit**

The total collateral value available after applicable haircuts and adjustments,

**MarginUtilized**

The actual margin amount currently blocked for open positions,

**MarginUtilizedPerc**

The percentage of the total margin limit that is currently being used,

**AvailableCollateral**

Collateral still free and available after margin utilization,

**InitialMargin**

The margin required to initiate positions,

**ExposureMargin**

Additional margin charged for exposure to market movements,

**SpreadBenefit**

Margin reduction benefit received due to offsetting or spread positions,

**FullMrgnExcldSprdBenft**

Total margin requirement without considering spread benefits,

**NxtTenderDayRqrdMargin**

Margin required to be maintained for the next tender day,

**NetPremium**

Net option premium payable or receivable.

---

### Username Wise Report

**UserName**

The name or identifier of the client account,

**Delta**

The overall delta representing price sensitivity of the client’s total positions,

**FutDelta**

The delta contribution coming specifically from futures positions,

**OptDelta**

The delta contribution coming specifically from options positions,

**Vega**

Sensitivity of the client’s position value to changes in implied volatility,

**Gamma**

Sensitivity of delta to changes in the underlying price,

**Theta**

Time decay impact on the value of the client’s positions,

**MTM**

Mark-to-Market profit or loss on all open positions,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**RealisedMTM**

Profit or loss that has been booked from closed positions,

**UnRealisedMTM**

Profit or loss on open positions that is not yet booked,

**DayRealisedMTM**

Realised profit or loss generated during the current trading day,

**DayUnRealisedMTM**

Unrealised profit or loss generated during the current trading day,

**DayMTM**

Total Mark-to-Market profit or loss for the current trading day,

**CollateralLimit**

The total collateral value considered before adjustments or haircuts,

**ConcentrationMargin**

Additional margin charged for holding highly concentrated positions,

**NetCollateralLimit**

The total collateral value available after applicable haircuts and adjustments,

**MarginUtilized**

The actual margin amount currently blocked for open positions,

**MarginUtilizedPerc**

The percentage of the total margin limit that is currently being used,

**AvailableCollateral**

Collateral still free and available after margin utilization,

**TotalClientLedger**

The net ledger balance of the client including funds and obligations,

**PledgeCollateral**

Collateral value obtained through pledged securities,

**InitialMargin**

The margin required to initiate positions,

**ExposureMargin**

Additional margin charged for exposure to market movements,

**SpreadBenefit**

Margin reduction benefit received due to offsetting or spread positions,

**VarMargin**

Value at Risk margin required based on market risk of positions,

**DayPayIn**

Funds required to be paid in by the client for the trading day,

**DayPayOut**

Funds receivable by the client for the trading day,

**AdSurMargin**

Additional or surveillance margin imposed by the exchange,

**MinMargin**

Minimum margin required to maintain open positions,

**ExrcAssgndValue**

The value of positions that have been exercised or assigned,

**FullMrgnExcldSprdBenft**

Total margin requirement without considering spread benefits,

**NxtTenderDayRqrdMargin**

Margin required to be maintained for the next tender day,

**NetPremium**

Net option premium payable or receivable.

---

### Client Wise Report

**ClientId**

A unique identifier assigned to the client,

**ClientName**

The registered name of the client,

**ClientType**

The classification of the client such as retail, institutional, or proprietary,

**CPCode**

The clearing participant or counterparty code associated with the client,

**NetValue**

The client’s overall net worth including ledger balance, collateral, and MTM,

**Delta**

The overall delta representing price sensitivity of the client’s total positions,

**FutDelta**

The delta contribution coming specifically from futures positions,

**OptDelta**

The delta contribution coming specifically from options positions,

**Vega**

Sensitivity of the client’s position value to changes in implied volatility,

**Gamma**

Sensitivity of delta to changes in the underlying price,

**Theta**

Time decay impact on the value of the client’s positions,

**MTM**

Mark-to-Market profit or loss on all open positions,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**RealisedMTM**

Profit or loss that has been booked from closed positions,

**UnRealisedMTM**

Profit or loss on open positions that is not yet booked,

**DayRealisedMTM**

Realised profit or loss generated during the current trading day,

**DayUnRealisedMTM**

Unrealised profit or loss generated during the current trading day,

**DayMTM**

Total Mark-to-Market profit or loss for the current trading day,

**ConcentrationMargin**

Additional margin charged for holding highly concentrated positions,

**MarginUtilized**

The actual margin amount currently blocked for open positions,

**PledgeCollateral**

Collateral value obtained through pledged securities,

**CollateralForExposure**

Collateral value considered for exposure calculation,

**CollateralAvailable**

Collateral still free and available for further trading,

**CollateralMarginUtilPerc**

The percentage of collateral margin that is currently utilized,

**InitialMargin**

The margin required to initiate positions,

**ExposureMargin**

Additional margin charged for exposure to market movements,

**SpreadBenefit**

Margin reduction benefit received due to offsetting or spread positions,

**VarMargin**

Value at Risk margin required based on market risk of positions,

**DayPayIn**

Funds required to be paid in by the client for the trading day,

**DayPayOut**

Funds receivable by the client for the trading day,

**AdSurMargin**

Additional or surveillance margin imposed by the exchange,

**MinMargin**

Minimum margin required to maintain open positions,

**ExrcAssgndValue**

The value of positions that have been exercised or assigned,

**NetPremium**

Net option premium payable or receivable by the client,

**Brokerage**

Total brokerage charges applicable to the client,

**Expenses**

Other charges and expenses applied to the client account,

**OrgLedger**

The original ledger balance before adjustments or settlements,

**NetLedger**

The net ledger balance after brokerage, expenses, and settlements,

**AvailableExposure**

The remaining trading exposure available to the client,

**LedgerMarginUtilizedPerc**

The percentage of ledger margin that is currently utilized.

---

### Symbol Wise Report

**Symbol**

The trading symbol or instrument identifier,

**NetQty**

The net quantity held after offsetting all buy and sell positions,

**NetValue**

The total value of the net position based on price and quantity,

**Delta**

The overall delta representing price sensitivity of the position,

**FutDelta**

The delta contribution coming specifically from futures positions,

**OptDelta**

The delta contribution coming specifically from options positions,

**Vega**

Sensitivity of the position value to changes in implied volatility,

**Gamma**

Sensitivity of delta to changes in the underlying price,

**Theta**

Time decay impact on the value of the position,

**MTM**

Mark-to-Market profit or loss on the position,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**RealisedMTM**

Profit or loss that has been booked from closed trades,

**UnRealisedMTM**

Profit or loss on open positions that is not yet booked,

**DayRealisedMTM**

Realised profit or loss generated during the current trading day,

**DayUnRealisedMTM**

Unrealised profit or loss generated during the current trading day,

**DayMTM**

Total Mark-to-Market profit or loss for the current trading day,

**IV**

Implied volatility used for option pricing and margin calculation,

**ConcentrationMargin**

Additional margin charged due to high concentration in the symbol,

**TotalMargin**

The total margin required for the position,

**InitialMargin**

The margin required to initiate the position,

**ExposureMargin**

Additional margin charged for exposure to market movements,

**SpreadBenefit**

Margin reduction benefit received due to offsetting or spread positions,

**VarMargin**

Value at Risk margin required based on market risk of the position,

**DayPayIn**

Funds required to be paid in for the trading day due to the position,

**DayPayOut**

Funds receivable for the trading day due to the position,

**MinMargin**

Minimum margin required to maintain the position,

**ExrcAssgndValue**

The value of positions that have been exercised or assigned,

**Brokerage**

Brokerage charges applicable to trades in the symbol,

**Expenses**

Other expenses or statutory charges related to the trades.

---

### Scrip Wise Report

**Scrip**

The trading scrip or instrument name,

**NetQty**

The net quantity held after offsetting all buy and sell trades,

**DayBuyQty**

The total quantity bought during the trading day,

**DaySellQty**

The total quantity sold during the trading day,

**BFNetQty**

The brought-forward net quantity from previous trading days,

**DayNetQty**

The net quantity generated during the current trading day,

**LTP**

The last traded price of the scrip,

**NetPrice**

The average net traded price of the position,

**StrikePrice**

The strike price applicable for option contracts,

**NetValue**

The total value of the net position based on price and quantity,

**Delta**

The overall delta representing price sensitivity of the position,

**FutDelta**

The delta contribution coming specifically from futures positions,

**OptDelta**

The delta contribution coming specifically from options positions,

**Vega**

Sensitivity of the position value to changes in implied volatility,

**Gamma**

Sensitivity of delta to changes in the underlying price,

**Theta**

Time decay impact on the value of the position,

**MTM**

Mark-to-Market profit or loss on the position,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**ExposureMargin**

Additional margin charged for exposure to market movements,

**SpreadBenefit**

Margin reduction benefit received due to offsetting or spread positions,

**VarMargin**

Value at Risk margin required based on market risk,

**MinMargin**

Minimum margin required to maintain the position,

**DayPayIn**

Funds required to be paid in for the trading day due to the position,

**DayPayOut**

Funds receivable for the trading day due to the position,

**PotentialLossUp**

Estimated potential loss if the price moves upward,

**PotentialLossDown**

Estimated potential loss if the price moves downward,

**ExrcAssgndValue**

The value of positions that have been exercised or assigned,

**RealisedMTM**

Profit or loss that has been booked from closed trades,

**UnRealisedMTM**

Profit or loss on open positions that is not yet booked,

**DayRealisedMTM**

Realised profit or loss generated during the current trading day,

**DayUnRealisedMTM**

Unrealised profit or loss generated during the current trading day,

**DayMTM**

Total Mark-to-Market profit or loss for the current trading day,

**IV**

Implied volatility used for option pricing and margin calculation,

**NetPremium**

Net option premium payable or receivable for the position,

**Brokerage**

Brokerage charges applicable to the trades,

**Expenses**

Other expenses or statutory charges related to the trades,

**TenderMargin**

Additional margin required for tender period obligations.

---

## NSEFO (NSE Futures & Options)

### Summary Report

**Exchange**

The trading venue where the position and risk values are applicable,

**Delta**

The overall delta representing price sensitivity of the total position,

**FutDelta**

The delta contribution coming specifically from futures positions,

**OptDelta**

The delta contribution coming specifically from options positions,

**Vega**

Sensitivity of the position value to changes in implied volatility,

**Gamma**

Sensitivity of delta to changes in the underlying price,

**Theta**

Time decay impact on the value of the position,

**MTM**

Mark-to-Market profit or loss on all open positions,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**RealisedMTM**

Profit or loss that has been booked from closed positions,

**UnRealisedMTM**

Profit or loss on open positions that is not yet booked,

**DayRealisedMTM**

Realised profit or loss generated during the current trading day,

**DayUnRealisedMTM**

Unrealised profit or loss generated during the current trading day,

**DayMTM**

Total Mark-to-Market profit or loss for the current trading day,

**MarginLimit**

The maximum margin allowed based on available collateral,

**ConcentrationMargin**

Additional margin charged for holding highly concentrated positions,

**MarginUtilizedPerc**

The percentage of total margin limit that is currently being used,

**NetCollateralLimit**

The total collateral value available after applicable haircuts and adjustments,

**InitialMargin**

The margin required to initiate positions,

**ExposureMargin**

Additional margin charged for exposure to market movements,

**NetPremium**

Net option premium payable or receivable,

**MarginUtilized**

The actual margin amount currently blocked for open positions,

**AvailableCollateral**

Collateral still free and available after margin utilization,

**SpreadBenefit**

Margin reduction benefit received due to offsetting or spread positions,

**FullMrgnExcldSprdBenft**

Total margin requirement without considering spread benefits,

**NxtTenderDayRqrdMargin**

Margin required to be maintained for the next tender day.

---

### Username Wise Report

**UserName**

The name or identifier of the client account,

**Delta**

The overall delta representing price sensitivity of the client’s total positions,

**FutDelta**

The delta contribution coming specifically from futures positions,

**OptDelta**

The delta contribution coming specifically from options positions,

**Vega**

Sensitivity of the client’s position value to changes in implied volatility,

**Gamma**

Sensitivity of delta to changes in the underlying price,

**Theta**

Time decay impact on the value of the client’s positions,

**MTM**

Mark-to-Market profit or loss on all open positions,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**RealisedMTM**

Profit or loss that has been booked from closed positions,

**UnRealisedMTM**

Profit or loss on open positions that is not yet booked,

**DayRealisedMTM**

Realised profit or loss generated during the current trading day,

**DayUnRealisedMTM**

Unrealised profit or loss generated during the current trading day,

**DayMTM**

Total Mark-to-Market profit or loss for the current trading day,

**CollateralLimit**

The total collateral value considered before adjustments or haircuts,

**ConcentrationMargin**

Additional margin charged for holding highly concentrated positions,

**TotalClientLedger**

The net ledger balance of the client including funds and obligations,

**MarginUtilizedPerc**

The percentage of the total margin limit that is currently being used,

**NetCollateralLimit**

The total collateral value available after applicable haircuts and adjustments,

**InitialMargin**

The margin required to initiate positions,

**ExposureMargin**

Additional margin charged for exposure to market movements,

**NetPremium**

Net option premium payable or receivable by the client,

**MarginUtilized**

The actual margin amount currently blocked for open positions,

**AvailableCollateral**

Collateral still free and available after margin utilization,

**PledgeCollateral**

Collateral value obtained through pledged securities,

**SpreadBenefit**

Margin reduction benefit received due to offsetting or spread positions,

**VarMargin**

Value at Risk margin required based on market risk of positions,

**DayPayIn**

Funds required to be paid in by the client for the trading day,

**DayPayOut**

Funds receivable by the client for the trading day,

**AdSurMargin**

Additional or surveillance margin imposed by the exchange,

**MinMargin**

Minimum margin required to maintain open positions,

**ExrcAssgndValue**

The value of positions that have been exercised or assigned,

**FullMrgnExcldSprdBenft**

Total margin requirement without considering spread benefits,

**NxtTenderDayRqrdMargin**

Margin required to be maintained for the next tender day.

---

### Client Wise Report

**ClientId**

A unique identifier assigned to the client,

**ClientName**

The registered name of the client,

**ClientType**

The classification of the client such as retail, institutional, or proprietary,

**CPCode**

The clearing participant or counterparty code associated with the client,

**Delta**

The overall delta representing price sensitivity of the client’s total positions,

**FutDelta**

The delta contribution coming specifically from futures positions,

**OptDelta**

The delta contribution coming specifically from options positions,

**Vega**

Sensitivity of the client’s position value to changes in implied volatility,

**Gamma**

Sensitivity of delta to changes in the underlying price,

**Theta**

Time decay impact on the value of the client’s positions,

**MTM**

Mark-to-Market profit or loss on all open positions,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**RealisedMTM**

Profit or loss that has been booked from closed positions,

**UnRealisedMTM**

Profit or loss on open positions that is not yet booked,

**DayRealisedMTM**

Realised profit or loss generated during the current trading day,

**DayUnRealisedMTM**

Unrealised profit or loss generated during the current trading day,

**DayMTM**

Total Mark-to-Market profit or loss for the current trading day,

**NetValue**

The client’s overall net worth including ledger balance, collateral, and MTM,

**PledgeCollateral**

Collateral value obtained through pledged securities,

**CollateralForExposure**

Collateral value considered for exposure calculation,

**CollateralAvailable**

Collateral still free and available for further trading,

**LedgerMarginUtilizedPerc**

The percentage of ledger margin that is currently utilized,

**InitialMargin**

The margin required to initiate positions,

**ExposureMargin**

Additional margin charged for exposure to market movements,

**NetPremium**

Net option premium payable or receivable by the client,

**Brokerage**

Total brokerage charges applicable to the client,

**Expenses**

Other charges and expenses applied to the client account,

**OrgLedger**

The original ledger balance before adjustments or settlements,

**NetLedger**

The net ledger balance after brokerage, expenses, and settlements,

**CollateralMarginUtilPerc**

The percentage of collateral margin that is currently utilized,

**ConcentrationMargin**

Additional margin charged for holding highly concentrated positions,

**MarginUtilized**

The actual margin amount currently blocked for open positions,

**SpreadBenefit**

Margin reduction benefit received due to offsetting or spread positions,

**VarMargin**

Value at Risk margin required based on market risk of positions,

**DayPayIn**

Funds required to be paid in by the client for the trading day,

**DayPayOut**

Funds receivable by the client for the trading day,

**AdSurMargin**

Additional or surveillance margin imposed by the exchange,

**MinMargin**

Minimum margin required to maintain open positions,

**ExrcAssgndValue**

The value of positions that have been exercised or assigned,

**AvailableExposure**

The remaining trading exposure available to the client.

---

### Symbol Wise Report

**Symbol**

The trading symbol or instrument identifier,

**NetQty**

The net quantity held after offsetting all buy and sell positions,

**Delta**

The overall delta representing price sensitivity of the position,

**FutDelta**

The delta contribution coming specifically from futures positions,

**OptDelta**

The delta contribution coming specifically from options positions,

**Vega**

Sensitivity of the position value to changes in implied volatility,

**Gamma**

Sensitivity of delta to changes in the underlying price,

**Theta**

Time decay impact on the value of the position,

**MTM**

Mark-to-Market profit or loss on the position,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**RealisedMTM**

Profit or loss that has been booked from closed trades,

**UnRealisedMTM**

Profit or loss on open positions that is not yet booked,

**DayRealisedMTM**

Realised profit or loss generated during the current trading day,

**DayUnRealisedMTM**

Unrealised profit or loss generated during the current trading day,

**DayMTM**

Total Mark-to-Market profit or loss for the current trading day,

**IV**

Implied volatility used for option pricing and margin calculation,

**TotalMargin**

The total margin required for the position,

**InitialMargin**

The margin required to initiate the position,

**ExposureMargin**

Additional margin charged for exposure to market movements,

**Brokerage**

Brokerage charges applicable to trades in the symbol,

**Expenses**

Other expenses or statutory charges related to the trades,

**NetValue**

The total value of the net position based on price and quantity,

**ConcentrationMargin**

Additional margin charged due to high concentration in the symbol,

**SpreadBenefit**

Margin reduction benefit received due to offsetting or spread positions,

**VarMargin**

Value at Risk margin required based on market risk of the position,

**DayPayIn**

Funds required to be paid in for the trading day due to the position,

**DayPayOut**

Funds receivable for the trading day due to the position,

**MinMargin**

Minimum margin required to maintain the position,

**ExrcAssgndValue**

The value of positions that have been exercised or assigned.

---

### Scrip Wise Report

**Scrip**

The trading scrip or instrument name,

**NetQty**

The net quantity held after offsetting all buy and sell positions,

**BFNetQty**

The brought-forward net quantity from previous trading days,

**DayNetQty**

The net quantity generated during the current trading day,

**LTP**

The last traded price of the scrip,

**NetPrice**

The average net traded price of the position,

**StrikePrice**

The strike price applicable for option contracts,

**NetValue**

The total value of the net position based on price and quantity,

**Delta**

The overall delta representing price sensitivity of the position,

**FutDelta**

The delta contribution coming specifically from futures positions,

**OptDelta**

The delta contribution coming specifically from options positions,

**Vega**

Sensitivity of the position value to changes in implied volatility,

**Gamma**

Sensitivity of delta to changes in the underlying price,

**Theta**

Time decay impact on the value of the position,

**MTM**

Mark-to-Market profit or loss on the position,

**RealisedMTM**

Profit or loss that has been booked from closed trades,

**UnRealisedMTM**

Profit or loss on open positions that is not yet booked,

**DayRealisedMTM**

Realised profit or loss generated during the current trading day,

**DayUnRealisedMTM**

Unrealised profit or loss generated during the current trading day,

**DayMTM**

Total Mark-to-Market profit or loss for the current trading day,

**IV**

Implied volatility used for option pricing and margin calculation,

**NetPremium**

Net option premium payable or receivable for the position,

**Brokerage**

Brokerage charges applicable to the trades,

**Expenses**

Other expenses or statutory charges related to the trades,

**DayBuyQty**

The total quantity bought during the trading day,

**DaySellQty**

The total quantity sold during the trading day,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**ExposureMargin**

Additional margin charged for exposure to market movements,

**SpreadBenefit**

Margin reduction benefit received due to offsetting or spread positions,

**VarMargin**

Value at Risk margin required based on market risk,

**MinMargin**

Minimum margin required to maintain the position,

**DayPayIn**

Funds required to be paid in for the trading day due to the position,

**DayPayOut**

Funds receivable for the trading day due to the position,

**PotentialLossUp**

Estimated potential loss if the price moves upward,

**PotentialLossDown**

Estimated potential loss if the price moves downward,

**ExrcAssgndValue**

The value of positions that have been exercised or assigned,

**TenderMargin**

Additional margin required for tender period obligations.

---

## MCX (Multi Commodity Exchange)

### Summary Report

**Exchange**

The trading venue where the positions and margins are applicable,

**NetCollateralLimit**

The total collateral value available after applicable haircuts and adjustments,

**MarginUtilizedPerc**

The percentage of the total margin limit that is currently being used,

**MarginLimit**

The maximum margin allowed based on available collateral,

**MTM**

Mark-to-Market profit or loss calculated on current open positions,

**ConcentrationMargin**

Additional margin charged for holding highly concentrated positions,

**MarginUtilized**

The actual margin amount currently blocked for open positions,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**AvailableCollateral**

Collateral still free and available after margin utilization,

**SpreadBenefit**

Margin reduction benefit received due to offsetting positions,

**VarMargin**

Value at Risk margin required based on market risk of positions,

**DayPayIn**

Funds required to be paid in by the client for the trading day,

**DayPayOut**

Funds receivable by the client for the trading day,

**AdSurMargin**

Additional or surveillance margin imposed by the exchange,

**MinMargin**

Minimum margin required to maintain open positions,

**FullMrgnExcldSprdBenft**

Total margin requirement without considering spread benefits,

**NxtTenderDayRqrdMargin**

Margin required to be maintained for the next tender day.

---

### Username Wise Report

**UserName**

The name or identifier of the client account,

**MTM**

Mark-to-Market profit or loss on current open positions,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**CollateralLimit**

The total collateral value considered before adjustments or haircuts,

**ConcentrationMargin**

Additional margin charged for holding highly concentrated positions,

**NetCollateralLimit**

The total collateral value available after applicable haircuts and adjustments,

**MarginUtilized**

The actual margin amount currently blocked for open positions,

**MarginUtilizedPerc**

The percentage of the total margin limit that is currently being used,

**AvailableCollateral**

Collateral still free and available after margin utilization,

**TotalClientLedger**

The net ledger balance of the client including funds and obligations,

**PledgeCollateral**

Collateral value obtained through pledged securities,

**ExrcAssgndValue**

The value of positions that have been exercised or assigned,

**SpreadBenefit**

Margin reduction benefit received due to offsetting positions,

**VarMargin**

Value at Risk margin required based on market risk of positions,

**DayPayIn**

Funds required to be paid in by the client for the trading day,

**DayPayOut**

Funds receivable by the client for the trading day,

**AdSurMargin**

Additional or surveillance margin imposed by the exchange,

**MinMargin**

Minimum margin required to maintain open positions,

**FullMrgnExcldSprdBenft**

Total margin requirement without considering spread benefits,

**NxtTenderDayRqrdMargin**

Margin required to be maintained for the next tender day.

---

### Client Wise Report

**ClientId**

A unique identifier assigned to the client,

**ClientName**

The registered name of the client,

**ClientType**

The classification of the client such as retail, institutional, or proprietary,

**CPCode**

The clearing participant or counterparty code associated with the client,

**NetValue**

The client’s overall net worth including ledger balance, collateral, and MTM,

**MTM**

Mark-to-Market profit or loss on current open positions,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**ConcentrationMargin**

Additional margin charged for holding highly concentrated positions,

**MarginUtilized**

The actual margin amount currently blocked for open positions,

**PledgeCollateral**

Collateral value obtained through pledged securities,

**OrgLedger**

The original ledger balance before adjustments or settlements,

**CollateralMarginUtilPerc**

The percentage of collateral margin that is currently utilized,

**CollateralForExposure**

Collateral value considered for exposure calculation,

**CollateralAvailable**

Collateral still free and available for further trading,

**ExrcAssgndValue**

The value of positions that have been exercised or assigned,

**Brokerage**

Total brokerage charges applicable to the client,

**Expenses**

Other charges and expenses applied to the client account,

**NetLedger**

The net ledger balance after brokerage, expenses, and settlements,

**AvailableExposure**

The remaining trading exposure available to the client,

**LedgerMarginUtilizedPerc**

The percentage of ledger margin that is currently utilized,

**SpreadBenefit**

Margin reduction benefit received due to offsetting positions,

**VarMargin**

Value at Risk margin required based on market risk of positions,

**DayPayIn**

Funds required to be paid in by the client for the trading day,

**DayPayOut**

Funds receivable by the client for the trading day,

**AdSurMargin**

Additional or surveillance margin imposed by the exchange,

**MinMargin**

Minimum margin required to maintain open positions,

**FullMrgnExcldSprdBenft**

Total margin requirement without considering spread benefits,

**NxtTenderDayRqrdMargin**

Margin required to be maintained for the next tender day.

---

### Symbol Wise Report

**Symbol**

The trading symbol or instrument identifier,

**NetQty**

The net quantity of the instrument after buy and sell positions are offset,

**NetValue**

The total value of the net position based on current or traded price,

**MTM**

Mark-to-Market profit or loss on the position,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**IV**

Implied volatility used for option pricing and margin calculation,

**ConcentrationMargin**

Additional margin charged due to high concentration in the symbol,

**TotalMargin**

The total margin required for the position,

**SpreadBenefit**

Margin reduction benefit received from offsetting or spread positions,

**VarMargin**

Value at Risk margin required based on market risk of the position,

**DayPayIn**

Funds required to be paid in for the trading day due to this position,

**DayPayOut**

Funds receivable for the trading day due to this position,

**MinMargin**

Minimum margin required to maintain the position,

**ExrcAssgndValue**

The value of positions that have been exercised or assigned,

**FullMrgnExcldSprdBenft**

Total margin requirement without considering spread benefits,

**NxtTenderDayRqrdMargin**

Margin required to be maintained for the next tender day,

**Brokerage**

Brokerage charges applicable to trades in the symbol,

**Expenses**

Other expenses or statutory charges related to the symbol.

---

### Scrip Wise Report

**Scrip**

The trading scrip or instrument name,

**NetQty**

The net quantity held after offsetting all buy and sell trades,

**DayBuyQty**

The total quantity bought during the trading day,

**DaySellQty**

The total quantity sold during the trading day,

**BFNetQty**

The brought-forward net quantity from previous trading days,

**DayNetQty**

The net quantity generated during the current trading day,

**LTP**

The last traded price of the scrip,

**NetPrice**

The average net traded price of the position,

**StrikePrice**

The strike price applicable for option contracts,

**NetValue**

The total value of the net position based on price and quantity,

**MTM**

Mark-to-Market profit or loss on the position,

**ICMTM**

Intraday or Inter-Client Mark-to-Market profit or loss,

**SpreadBenefit**

Margin reduction benefit received due to offsetting or spread positions,

**VarMargin**

Value at Risk margin required based on market risk,

**MinMargin**

Minimum margin required to maintain the position,

**DayPayIn**

Funds required to be paid in for the trading day due to the position,

**DayPayOut**

Funds receivable for the trading day due to the position,

**PotentialLossUp**

Estimated potential loss if the price moves upward,

**PotentialLossDown**

Estimated potential loss if the price moves downward,

**ExrcAssgndValue**

The value of positions that have been exercised or assigned,

**IV**

Implied volatility used for option pricing and margin calculation,

**Brokerage**

Brokerage charges applicable to the trades,

**Expenses**

Other expenses or statutory charges related to the trades,

**FullMrgnExcldSprdBenft**

Total margin requirement without considering spread benefits,

**NxtTenderDayRqrdMargin**

Margin required to be maintained for the next tender day.

---


## Notes

- This documentation is generated from Excel files containing field definitions for various trading exchanges
- Each exchange has five types of reports: Summary, Username Wise, Client Wise, Symbol Wise, and Scrip Wise
- Field descriptions provide details about data types, formats, and business logic

---

*Generated from: NSEEQ.xlsx, NSECD.xlsx, NSEFO.xlsx, MCX.xlsx*
