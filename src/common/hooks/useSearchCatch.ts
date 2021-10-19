
import useRouter from "use-react-router";
import { pathToRegexp } from "path-to-regexp";
import menus from "@src/router/side-menus";
// export const catchList = ["orders_order", "orders_abandon"];
export const SEARCH_CATCH = "SEARCH_CATCH"
interface UseSearchCatchResult {
    getSearchCatch: any,
    getSearchCatchKey: any,
    setSearchCatch: any,
    removeSearchCatch: any
}
function useSearchCatch(): UseSearchCatchResult {
    const { location } = useRouter();
    const currentMenu = menus.find(
        _ => _.url && pathToRegexp(_.url).exec(location.pathname)
    );
    const getSearchCatch = () => sessionStorage.getItem(SEARCH_CATCH) && JSON.parse(sessionStorage.getItem(SEARCH_CATCH)).value;
    const getSearchCatchKey = () => sessionStorage.getItem(SEARCH_CATCH) && JSON.parse(sessionStorage.getItem(SEARCH_CATCH)).key;
    const setSearchCatch = (params) => {
        const catchParams = {
            key: currentMenu.searchCatchKey,
            value: params
        }
        sessionStorage.setItem(SEARCH_CATCH, JSON.stringify(catchParams))
    }
    const removeSearchCatch = () => {
        console.log(22222222222222222222)
        sessionStorage.removeItem(SEARCH_CATCH)
    }
    return {
        getSearchCatch,
        getSearchCatchKey,
        setSearchCatch,
        removeSearchCatch
    }
}

export default useSearchCatch;
