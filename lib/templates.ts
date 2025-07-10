export const templates = Object.fromEntries(
  Object.entries(
    import.meta.glob('../templates/**/*', { as: 'raw', eager: true })
  ).map(([key, value]) => [key.replace('../templates/', ''), value as string])
);
