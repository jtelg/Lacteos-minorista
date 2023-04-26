import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// const arr_nav = [{ label: "Picadas", route: "/picadas", icon: "" }];

const Desktop = ({ state_carrito, state_nav }) => {
  const router = useRouter();
  const [path, setPath] = useState('');

  useEffect(() => {
    const path = router.pathname.split('/')[1];
    const newPath = path[0]?.toUpperCase() + path.substring(1);
    setPath(newPath);
  }, [router]);

  return (
    <nav className="md:flex hidden items-center justify-between w-full">
      <ul className="flex items-center justify-between w-full gap-8">
        {state_nav?.map(
          (e, i) =>
            e.label && (
              <li key={i}>
                <Link
                  href={e.route}
                  className={`text-[18px] ${
                    path === e.label || router.pathname === e.route
                      ? 'text-secondary brother-800 '
                      : 'text-white  '
                  } `}
                >
                  {e.label}
                </Link>
              </li>
            )
        )}
        <li>
          <Link href={'/carrito'} className={`text-[18px] text-white `}>
            <div className="relative">
              {state_carrito.length > 0 && (
                <div className="absolute top-[-7px] right-[-10px] bg-red-500 rounded-full w-4 h-4 text-xs z-[-1] flex items-center justify-center ">
                  {state_carrito?.length}
                </div>
              )}
              <i className={`bx bxs-cart text-xl z-10 `}></i>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Desktop;
