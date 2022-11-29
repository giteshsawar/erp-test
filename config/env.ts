let env = process.env.NODE_ENV;

if (!env) {
  env = "development";
}

export = env;
