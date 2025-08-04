'use client'

import { cn } from '@/lib/utils'

// logos
import Github from '../../public/logo/github.svg'
import Google from '../../public/logo/google.svg'
import Kakao from '../../public/logo/kakao.svg'
import Logo from '../../public/logo/logo.svg'

// icons
import Add from '../../../../public/icons/add.svg'
import BottomArrow from '../../../../public/icons/bottom-arrow.svg'
import Close from '../../../../public/icons/close.svg'
import CommonSubFlow from '../../../../public/icons/common-sub-flow.svg'
import Copy from '../../../../public/icons/copy.svg'
import Cut from '../../../../public/icons/cut.svg'
import Delete from '../../../../public/icons/delete.svg'
import Drag from '../../../../public/icons/drag.svg'
import Error from '../../../../public/icons/error.svg'
import HamburgerMenu from '../../../../public/icons/hamburger-menu.svg'
import Invisible from '../../../../public/icons/invisible.svg'
import Loading from '../../../../public/icons/loading.svg'
import MenuDot from '../../../../public/icons/menu-dot.svg'
import Menu from '../../../../public/icons/menu.svg'
import Moon from '../../../../public/icons/moon.svg'
import Paste from '../../../../public/icons/paste.svg'
import PlayOn from '../../../../public/icons/playon.svg'
import Plus from '../../../../public/icons/plus.svg'
import Refresh from '../../../../public/icons/refresh.svg'
import Rename from '../../../../public/icons/rename.svg'
import InputSearch from '../../../../public/icons/search.svg'
import SubFlowMenu from '../../../../public/icons/sub-flow-menu.svg'
import SubFlowService from '../../../../public/icons/sub-flow-service.svg'
import Success from '../../../../public/icons/success.svg'
import Sun from '../../../../public/icons/sun.svg'
import TopArrow from '../../../../public/icons/top-arrow.svg'
import TriangleLeft from '../../../../public/icons/triangle-left.svg'
import TriangleRight from '../../../../public/icons/triangle-right.svg'
import Visible from '../../../../public/icons/visible.svg'
import X from '../../../../public/icons/x.svg'

export type IconButtonProps = {
  width?: number
  height?: number
  size?: number
  className?: string
  color?: string
  backgroundColor?: string
  disabled?: boolean
  cursor?: string
  onClick?: React.MouseEventHandler<SVGSVGElement>
}

function withIconStyle(
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
): React.ComponentType<IconButtonProps> {
  const IconWithStyle = ({
    className,
    size = 24,
    width,
    height,
    cursor,
    disabled,
    onClick,
    color,
    backgroundColor,
    ...rest
  }: IconButtonProps) => {
    let cur = ''
    if (cursor) {
      cur = cursor
    } else {
      cur = onClick ? 'pointer' : ''
    }

    return (
      <div
        style={{
          width: `${width ?? size}px`,
          height: `${height ?? size}px`,
          fontSize: `${width && height ? (width + height) / 2 : size}px`,
          backgroundColor: backgroundColor,
          color: color,
          cursor: disabled ? 'none' : cur,
          opacity: disabled ? 0.1 : 1,
        }}
        className={cn('flex items-center justify-center', className)}
        {...rest}
      >
        <Icon
          fontSize="inherit"
          color="inherit"
          onClick={onClick as React.MouseEventHandler<SVGSVGElement>}
        />
      </div>
    )
  }

  return IconWithStyle
}

// logos
export const GithubIcon = withIconStyle(Github)
export const GoogleIcon = withIconStyle(Google)
export const KakaoIcon = withIconStyle(Kakao)
export const LogoIcon = withIconStyle(Logo)

// icons
export const TriangleLeftIcon = withIconStyle(TriangleLeft)
export const TriangleRightIcon = withIconStyle(TriangleRight)
export const HamburgerMenuIcon = withIconStyle(HamburgerMenu)
export const BottomArrowIcon = withIconStyle(BottomArrow)
export const CloseIcon = withIconStyle(Close)
export const PlayOnIcon = withIconStyle(PlayOn)
export const CopyIcon = withIconStyle(Copy)
export const CutIcon = withIconStyle(Cut)
export const DeleteIcon = withIconStyle(Delete)
export const ErrorIcon = withIconStyle(Error)
export const PasteIcon = withIconStyle(Paste)
export const PlusIcon = withIconStyle(Plus)
export const LoadingIcon = withIconStyle(Loading)
export const InputSearchIcon = withIconStyle(InputSearch)
export const InVisibleIcon = withIconStyle(Invisible)
export const SuccessIcon = withIconStyle(Success)
export const TopArrowIcon = withIconStyle(TopArrow)
export const VisibleIcon = withIconStyle(Visible)
export const XIcon = withIconStyle(X)
export const AddIcon = withIconStyle(Add)
export const MenuIcon = withIconStyle(Menu)
export const MenuDotIcon = withIconStyle(MenuDot)
export const DragIcon = withIconStyle(Drag)
export const RefreshIcon = withIconStyle(Refresh)
export const RenameIcon = withIconStyle(Rename)
export const SunIcon = withIconStyle(Sun)
export const MoonIcon = withIconStyle(Moon)
export const SubFlowMenuIcon = withIconStyle(SubFlowMenu)
export const SubFlowServiceIcon = withIconStyle(SubFlowService)
export const CommonSubFlowIcon = withIconStyle(CommonSubFlow)
