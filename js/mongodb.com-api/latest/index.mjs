// Create Function that query's the MongoDB API

const CreateMongoDBQuery = (
  { APP_ID, DATA_API_KEY, COLLECTION, DATABASE, DATA_SOURCE },
  DEFAULT_URL = "https://data.mongodb-api.com/app/$APP_ID/endpoint/data/beta/action/"
) => {
  const url = DEFAULT_URL.replace("$APP_ID", APP_ID);
  return (path, fields) => {
    return fetch(`${url}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": DATA_API_KEY,
      },
      body: JSON.stringify({
        collection: COLLECTION,
        database: DATABASE,
        dataSource: DATA_SOURCE,
        ...fields,
      }),
    });
  };
};

export default CreateMongoDBQuery;
