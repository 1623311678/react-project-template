import gql from "graphql-tag";

export const shopSettingCheckoutUpdate = gql`
  mutation shopSettingCheckoutUpdate($input: shopSettingCheckoutUpdateInput!) {
    shopSettingCheckoutUpdate(input: $input) {
      limitationOnPurchase
      limitationCount
      customerAuthority
      checkoutPageType
      contactInfo
      customerName
      customerAddress
      customerPhone
      zipCheck
      sameBillingAndShippingAddress
      acceptTipPayments
      tipPaymentsOptionOne
      tipPaymentsOptionTwo
      tipPaymentsOptionThree
      abandonedCheckoutEmailRecipient
      abandonedCheckoutEmailTimeConf {
        send_email_number
        send_email_first
        send_email_second
        send_email_third
        first_discount_code
        sencod_discount_code
        third_discount_code
        send_email_first_customize
        send_email_second_customize
        send_email_third_customize
      }
      abandonedCheckoutEmails
      zipLable
      checkoutEmail
    }
  }
`;

// export const shopSettingCheckoutUpdate = gql`
//   mutation shopSettingCheckoutUpdate($input: shopSettingCheckoutUpdateInput!) {
//     shopSettingCheckoutUpdate(input: $input) {
//       customerAuthority
//       checkoutPageType
//       contactInfo
//       customerName
//       customerCompanyName
//       customerAddress
//       customerPhone
//       zipCheck
//       sameBillingAndShippingAddress
//       addressAutoCompletion
//       acceptTipPayments
//       tipPaymentsOptionOne
//       tipPaymentsOptionTwo
//       tipPaymentsOptionThree
//       abandonedCheckoutEmailRecipient
//       abandonedCheckoutEmailTimeConf {
//         send_email_number
//         send_email_first
//         send_email_second
//         send_email_third
//         send_email_first_customize
//         send_email_second_customize
//         send_email_third_customize
//       }
//       abandonedCheckoutEmails
//     }
//   }
// `;
