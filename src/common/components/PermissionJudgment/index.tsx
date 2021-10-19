/**
 * @param permissionKey 当前按钮或模块对应得权限key
 * @param children 展示的模块内容
 * 使用示例：
 * import PermissionJudgment from '@src/common/components/PermissionJudgment'
 * <PermissionJudgment permissionKey="DASHBOAR3D">
     <Button>
       创建折扣
     </Button>
 </PermissionJudgment>
 */

import React from "react";
import { useAuth } from "@src/auth/AuthProviderFPP";

interface PermissionJudgmentProps {
    permissionKey?: string;
    children?: React.ReactNode;
}

const PermissionJudgment: React.FC<PermissionJudgmentProps> = props => {
    const { permissionKey,children } = props;
    const { user } = useAuth();
    return (
        <div>
            {
                permissionKey&&permissionKey!=='PREFERENCES || PAYMENTS || CHECKOUTS || DOMAINS'&&user&&user.permissions.indexOf(permissionKey)>-1&&(
                    <div>{children}</div>
                )
            }
            {
                permissionKey&&permissionKey==='PREFERENCES || PAYMENTS || CHECKOUTS || DOMAINS'&&user&&((user.permissions.indexOf('PREFERENCES')>-1) || (user.permissions.indexOf('PAYMENTS'))>-1 || (user.permissions.indexOf('CHECKOUTS')>-1)|| (user.permissions.indexOf('DOMAINS'))>-1)&&(
                    <div>{children}</div>
                )
            }


        </div>
    );
};

PermissionJudgment.displayName = "PermissionJudgment";
export default PermissionJudgment;
