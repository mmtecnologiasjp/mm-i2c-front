import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useSSOUser } from '../../../hooks/sso';
import { useRouteItems } from '../../Navbar/components/hooks/useRouteItem';

export function useLoadPlugins() {
  const { user } = useSSOUser();
  const { data: scriptUrls, isFetchedAfterMount } = useQuery<string[]>({
    queryFn: async () => {
      if (!user) return null;

      const response = await totpApi.getUserPluginCodePaths(user.id);

      return response.data;
    },
    queryKey: ['plugins', user?.id],
  });
  const { setRoutes } = useRouteItems();

  function handleChangeOfRoutes() {
    setRoutes((routes) => {
      const defaultRoutes = routes.filter((route) => route.default);

      if (window.customPages.length === 0) return defaultRoutes;

      const findItemOnCustomPagesThatNoLongerExistsOnRoutes = window.customPages.filter(
        (page) => {
          return !routes.some((route) => route.path === page.path);
        },
      );

      if (!findItemOnCustomPagesThatNoLongerExistsOnRoutes.length) return routes;

      const findItemOnRoutesThatNoLongerExistsOnCustomPages = routes.filter((route) => {
        if (route.default) return false;

        return !window.customPages.some((page) => page.path === route.path);
      });

      if (!findItemOnRoutesThatNoLongerExistsOnCustomPages.length) {
        return [
          ...routes,
          ...window.customPages.map((page, i) => ({
            path: page.path,
            name: page.sidebar?.iconLabel ?? page.elementName,
            icon: <IconName>page.sidebar?.icon ?? 'SearchX',
            order: i + 3,
          })),
        ];
      }

      return [
        ...routes.filter(
          (route) => !findItemOnRoutesThatNoLongerExistsOnCustomPages.includes(route),
        ),
        ...window.customPages.map((page, i) => ({
          path: page.path,
          name: page.sidebar?.iconLabel ?? page.elementName,
          icon: <IconName>page.sidebar?.icon ?? 'SearchX',
          order: i + 3,
        })),
      ];
    });
  }

  async function loadScripts() {
    if (!scriptUrls) return;

    await Promise.all(
      scriptUrls.map((scriptUrl) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            reject(false);
          };
          script.src = scriptUrl;
          script.defer = true;
          document.body.appendChild(script);
        });
      }),
    );

    handleChangeOfRoutes();
  }

  useEffect(() => {
    loadScripts();
  }, [scriptUrls, user]);

  return {
    isLoadCustomPagesCompleted: isFetchedAfterMount,
  };
}
