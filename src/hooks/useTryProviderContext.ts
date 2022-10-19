import React from "react";

const useTryProviderContext = <T>(context: React.Context<T>) => {
  const _context = React.useContext(context);

  if (!_context) {
    throw new Error(`[${context.displayName}] missing in component tree`);
  }

  return _context;
};

export default useTryProviderContext;
