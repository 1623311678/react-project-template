import gql from "graphql-tag";

export const shopSettingCheckout = gql`
  query shopSettingCheckout {
    shopSettingCheckout {
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

export const getCodeDiscounts = gql`
  query getCodeDiscounts($first: Int, $last: Int, $before: String, $after: String, $query: String) {
    codeDiscounts(first: $first, last: $last, before: $before, after: $after, query: $query) {
      edges {
        cursor
        node {
          id
          title
          status
          startsAt
          endsAt
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }  
    }
  }
`

