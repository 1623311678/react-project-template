import * as mutations from "./mutation";
import * as queries from "./queries";
import fppClient from "@src/api/base";

enum abandonedCheckoutEmailRecipient {
  ALL,
  SUBSCRIBERS
}

type abandonedCheckoutEmailTimeConf = {
  send_email_number?: number;
  send_email_first?: number;
  send_email_second?: number;
  send_email_third?: number;
};

type shopSettingCheckoutType = {
  customerAuthority: number;
  checkoutPageType: number;
  contactInfo: number;
  customerName: number;
  customerCompanyName?: number;
  customerAddress: number;
  customerPhone: number;
  zipCheck: boolean;
  sameBillingAndShippingAddress: boolean;
  addressAutoCompletion?: boolean;
  acceptTipPayments: boolean;
  tipPaymentsOptionOne?: string;
  tipPaymentsOptionTwo?: string;
  tipPaymentsOptionThree?: string;
  abandonedCheckoutEmailRecipient?: abandonedCheckoutEmailRecipient;
  abandonedCheckoutEmailTimeConf?: abandonedCheckoutEmailTimeConf;
  abandonedCheckoutEmails?: boolean;
};

export const shopSettingCheckoutUpdate = (
  shopSettingCheckoutUpdateInput: shopSettingCheckoutType
) => {
  return fppClient.mutate({
    mutation: mutations.shopSettingCheckoutUpdate,
    variables: {
      input: shopSettingCheckoutUpdateInput
    }
  });
};

export const shopSettingCheckout = () => {
  return fppClient.query({
    query: queries.shopSettingCheckout,
    variables: {},
    fetchPolicy: "network-only"
  });
};

export const getCodeDiscounts = ({ first, last, before, after, query }) => {
  return fppClient.query({
    query: queries.getCodeDiscounts,
    variables: {
      first,
      last,
      before,
      after,
      query
    },
    fetchPolicy: "network-only"
  });
};

