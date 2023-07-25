import { useRouter, usePathname, useSearchParams } from "next/navigation";
// ----------------------------------------------------------------------

export default function useActiveLink(path, deep = true) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const checkPath = path && path?.startsWith("#");

  const currentPath = path === "/" ? "/" : `${path}/`;

  const normalActive =
    (!checkPath && pathname === currentPath) ||
    (!checkPath && pathname + searchParams === currentPath);

  const deepActive =
    (!checkPath && pathname.includes(currentPath)) ||
    (!checkPath && (pathname + searchParams).includes(currentPath));

  return {
    active: deep ? deepActive : normalActive,
    isExternalLink: path && path?.includes("http"),
  };
}
