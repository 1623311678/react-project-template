import gql from "graphql-tag";

// export const applyChange = gql`
//   mutation menu($root: InputRoot!, $items: [InputItem]) {
//     applyChange(root: $root, items: $items) {
//       root {
//         tid
//         name
//         handle
//       }
//       items {
//         tid
//         name
//         subject
//         tag
//         sid
//         display
//         son {
//           tid
//           name
//           subject
//           tag
//           sid
//           display
//           son {
//             tid
//             name
//             subject
//             tag
//             sid
//             display
//           }
//         }
//       }
//     }
//   }
// `;


export const applyChange = gql`
  mutation menu($root: InputRoot!, $items: [InputItem]) {
    applyChange(root: $root, items: $items) {
      root {
        tid
        name
        handle
      }
      items {
        tid
        name
        subject
        tag
        sid
        display
        handle
        son {
          tid
          name
          subject
          tag
          sid
          display
          handle
          son {
            tid
            name
            subject
            tag
            sid
            display
            handle
          }
        }
      }
      userErrors{
        message
        code
        field
      }
    }
  }
`

export const applyDelete = gql`
  mutation applyDelete($tid: Float!) {
    applyDelete(tid: $tid)
  }
`


export const decorateHeaderUpdate = gql`
  mutation decorateHeaderUpdate($input: DecorateInput) {
    decorateHeaderUpdate(input: $input){
      decorate {
        id
        name
        data
        type
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`

