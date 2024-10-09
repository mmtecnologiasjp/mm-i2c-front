import { useCallback } from 'react';
import { DropResult } from 'react-beautiful-dnd';

export type SideBarRouteItems = {
  path: string;
  name: string;
  icon: IconName;
};

export function useRouteItems() {
  const initialRoutes: {
    path: string;
    name: string;
    order: number;
    icon: IconName;
    default?: boolean;
  }[] = [
    { path: '/', name: 'Home', icon: 'Home', order: 1, default: true },
    { path: '/totp', name: 'Auth', icon: 'Lock', order: 2, default: true },
    ...window.customPages.map((page, i) => ({
      path: page.path,
      name: page.sidebar?.iconLabel ?? page.elementName,
      icon: <IconName>page.sidebar?.icon ?? 'SearchX',
      order: i + 3,
    })),
  ];

  const [routes, setRoutes, { removeItem }] = useLocalStorageState('routes', {
    defaultValue: initialRoutes,
  });
  const {
    isOpen: isDragging,
    onClose: onCloseIsDragging,
    onOpen: onOpenIsDragging,
  } = useDisclosure();

  function truncateLargeRouteName(name: string) {
    const maxLength = 10;

    if (name.length > maxLength) {
      return name.slice(0, maxLength) + '...';
    }

    return name;
  }

  function onDragStart() {
    onOpenIsDragging();
  }

  const onDragEnd = useCallback(
    (dropResult: DropResult) => {
      if (!dropResult.destination) {
        onCloseIsDragging();
        return;
      }

      const { source, destination } = dropResult;

      const newRoutes = [...routes];

      const [removed] = newRoutes.splice(source.index, 1);

      newRoutes.splice(destination.index, 0, removed);

      const newRoutesWithOrderUpdated = newRoutes.map((route, i) => ({
        ...route,
        order: i + 1,
      }));

      setRoutes(newRoutesWithOrderUpdated);
      onCloseIsDragging();
    },
    [routes],
  );

  return {
    routes: routes.map((route) => ({
      ...route,
      name: truncateLargeRouteName(route.name),
    })),
    onDragEnd,
    removeItem,
    setRoutes,
    isDragging,
    onDragStart,
  };
}
