/*
Copyright 2021 Square Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const express = require("express");
const router = express.Router();
const {
  giftCardsApi,
  giftCardActivitiesApi,
  customersApi,
  ordersApi,
  paymentsApi,
  locationsApi
} = require("../util/square-client");

router.get("/", async (req, res, next) => {
  // display a list of gift cards linked to the
  // customer's account
  let giftCards;
  try {
    const response = await giftCardsApi.listGiftCards(undefined, undefined, undefined, undefined, req.session.customerid);
    giftCards = response.result;
  } catch(error) {
    console.log(error);
  }
  if (Object.keys(giftCards).length === 0) {
    res.render("pages/no-cards");
  } else {
    res.render("pages/all-cards");
  }

});

module.exports = router;