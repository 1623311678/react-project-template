import useRouter from "use-react-router";
import { IS_PRODUCTION_MODE } from "@src/config"

export type UseNavigatorResult = (
  url: string,
  id?: string | number,
  replace?: boolean,
  preserveQs?: boolean,
) => void;
function useNavigator(): UseNavigatorResult {
  const {
    location: { search },
    history
  } = useRouter();


  return (url: string, id = "", replace = false, preserveQs = false) => {
    if(url){
    let targetUrl = preserveQs ? url + search : url;
    if (targetUrl === "/themes") {
      let pathName = "/";
      if (IS_PRODUCTION_MODE) {
        pathName = "/admin/";
      }
      // window.location.href = window.location.origin + pathName + `s.html#/themes/${id}`;
      const openUrl = window.location.origin + pathName + `s.html#/themes/${id}`;
      window.open(openUrl)
    } 
    else if(targetUrl === "/memberSystem") {
      let pathName = "/";
      if (process.env.NODE_ENV === "production") {
        pathName = "/admin/";
      }
      // const openUrl = window.location.origin + pathName + `member.html#/member`;
      const openUrl = window.location.origin + pathName + `member`;
      window.open(openUrl)
    }else {
      if (replace) {
        history.replace(targetUrl);
      } else {
        history.push(targetUrl);
      }
    }
  }
    document.querySelector('.fpp_layout-content').scrollTo({ behavior: "smooth", top: 0 });

    window.scrollTo({ behavior: "smooth", top: 0 });
  };
}

export default useNavigator;
