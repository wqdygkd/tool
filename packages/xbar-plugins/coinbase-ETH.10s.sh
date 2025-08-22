#!/bin/bash

# Shows last Ethereum price in USD.
#
# <xbar.title>Ethereum last price</xbar.title>
# <xbar.version>0.1B</xbar.version>
# <xbar.author>Nikita Zhavoronkov</xbar.author>
# <xbar.author.github>Har01d</xbar.author.github>
# <xbar.desc>Shows last Ethereum price in USD.</xbar.desc>
# <xbar.image>http://i.imgur.com/lF2AA7o.png</xbar.image>
#
# by Nikita Zhavoronkov
# Based on Coinbase bitbar plugin by Mat Ryer

RESULT=$(curl -s --fail "https://api.coinbase.com/v2/prices/ETH-USD/spot")
if [ $? -ne 0 ] || [ -z "$RESULT" ]; then
  echo "𝚵 N/A"
  exit 0
fi

AMOUNT=$(printf '%s' "$RESULT" | sed -n 's/.*"amount":"\([0-9][0-9]*\(\.[0-9][0-9]*\)\?\)".*/\1/p')

if [ -z "$AMOUNT" ]; then
  if command -v jq >/dev/null 2>&1; then
    AMOUNT=$(printf '%s' "$RESULT" | jq -r '.data.amount')
  fi
fi

if [ -z "$AMOUNT" ] || [ "$AMOUNT" = "null" ]; then
  AMOUNT="N/A"
fi

echo "𝚵 $AMOUNT"
