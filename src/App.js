import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { create } from "./redux/actions/actions";
import axios from "axios";

const ListRepo = () => {
  const dispatch = useDispatch();
  const [listRepo, setListRepo] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = async (e) => {
    await axios
      .get(`https://api.github.com/users/${e.target.value}/repos`)
      .then((responses) => {
        // Looping create object insert to redux
        const data = responses.data.map(
          ({ name, created_at, description, html_url }) => {
            return { name, created_at, description, html_url };
          }
        );
        setListRepo(data);
        dispatch(create(data));
        setErrorMessage(null);
      })
      .catch((e) => {
        setErrorMessage("Repository dengan username tersebut tidak ditemukan");
        setListRepo([]);
        dispatch(create([]));
      });
  };

  return (
    <>
      <div>
        <div className="container mx-auto p-4 bg-sky-200">
          <div className="flex flex-wrap justify-center xl:w-4/12 md:w-6/12 md:mx-auto xl:mx-auto">
            <h1 className="text-base font-semibold text-primary md:text-xl mb-10"><span
              className="block font-medium font-sans text-sky-900 text-dark text-4xl mt-1 border  border-b-4 border-t-0 border-r-0 border-l-0 border-sky-300 p-4">Github Repository</span>
            </h1>
          </div>
          <div className="w-fll px-4">
            <div className="flex flex-wrap justify-center xl:w-4/12 md:w-6/12 md:mx-auto xl:mx-auto">
              <input
                type="search"
                name="search-form"
                id="search-form"
                className="w-full bg-slate-50 text-dark rounded-md p-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Search by username.. ex: coco"
                onChange={handleChange}
              ></input>
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4 bg-slate-50">

          <div className="x-4">
            <div className="flex flex-wrap justify-center xl:w-5/12 xs:w-5/12 sm:w-8/12 md:w-8/12 md:mx-auto sm:mx-auto xl:mx-auto">

              {
                (listRepo.length === 0 ? <p>Tidak ada project di dalam username ini</p> :
                  listRepo.map((cat, key) => {
                    return <div className="p-4 w-full" key={cat.id}>

                      <div className="bg-slate-100 rounded-xl shadow-lg mx-a">
                        <details className="bg-white shadow rounded group mb-4" >
                          <summary className="list-none flex flex-wrap cursor-pointer focus-visible:outline-none rounded group-open:rounded-b-none group-open:z-[1] relative mx-auto text-center">
                            <h5 className="flex flex-1 p-4 font-semibold">{cat.name}</h5>
                            <div className="flex w-10 items-center justify-center">
                              <div className="border-8 border-transparent border-l-gray-600 ml-2  group-open:rotate-90 transition-transform origin-left"></div>
                            </div>
                          </summary>
                          <div className="p-4 bg-slate-100">
                            <div class="md:flex md:items-center mb-6">

                              <div class="w-full">
                                <div className="flex flex-row">
                                  <div className="w-4/12 text-left font-bold">Deskripsi</div>
                                  <div className="w-1/12 text-left">: </div>
                                  <div className="w-7/12 text-left">{cat.description}</div>
                                </div>
                                <div className="flex flex-row">
                                  <div className="w-4/12 text-left font-bold">Link Github</div>
                                  <div className="w-1/12 text-left">: </div>
                                  <div className="w-7/12 text-left"><a href={cat.html_url} className="text-blue-700">{cat.html_url}</a></div>
                                </div>
                                <div className="flex flex-row">
                                  <div className="w-4/12 text-left font-bold">Tanggal Pembuatan</div>
                                  <div className="w-1/12 text-left">: </div>
                                  <div className="w-7/12 text-left">{cat.created_at}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </details>
                      </div>
                    </div>
                  }))
              }
              {errorMessage !== null && errorMessage}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListRepo;
