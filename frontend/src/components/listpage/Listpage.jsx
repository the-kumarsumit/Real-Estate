import React, { Suspense } from "react";
import Filter from "../filter/Filter";
import Card from "../card/Card";
import Map from "../map/Map";
import { Await, useLoaderData } from "react-router-dom";

function Listpage() {
  const data = useLoaderData();
  return (
    <div className="flex h-full flex-col sm:flex-row px-2">
      <div className="sm:flex-[3] h-full">
        <div className="h-full flex flex-col overflow-y-scroll pb-12 gap-[50px]">
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post) => (
                  <Card key={post._id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className=" hidden lg:flex sm:flex-[2] bg-[#fcf5f3]">
      <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse) => <Map items={postResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export default Listpage;
