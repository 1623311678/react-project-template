import gql from "graphql-tag";

export const decorateSetMutation = gql`
  mutation decorate($config: [FirstInput]!, $flag:String!,$route:String!) {
    setDecorates(config: $config,flag:$flag,route:$route) {
      templateData {
        sections
        indexes
      }
    }
  }
`;
