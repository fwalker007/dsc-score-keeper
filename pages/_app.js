import '../styles/Home.module.css'

import React from "react";
import Table from "./Table";

const getData = () => [
  {
    name: "Jane Cooper",
    meet1: "90",
    meet2:  "120",
    meet3:  "121",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cody Fisher",
    meet1: "90",
    meet2:  "120",
    meet3:  "121",
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Esther Howard",
    meet1: "110",
    meet2:  "112",
    meet3:  "90",
    imgUrl:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jenny Wilson",
    meet1: "93",
    meet2:  "80",
    meet3:  "81",
    imgUrl:
      "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Kristin Watson",
    meet1: "122",
    meet2:  "121",
    meet3:  "122",
    imgUrl:
      "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cameron Williamson",
    meet1: "87",
    meet2:  "117",
    meet3:  "111",
    imgUrl:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Athlete",
        accessor: "name",
      },
      {
        Header: "Meet 1",
        accessor: "meet1",
      },
      {
        Header: "Meet 2",
        accessor: "meet2",
      },
      {
        Header: "Meet 3",
        accessor: "meet3",
      },


    ],
    []
  );

  const data = React.useMemo(() => getData(), []);

  return (

      <main>

        <h1 style={{textAlign:"center"}}  >SCORE KEEPER </h1>

        <div >
          <Table columns={columns} data={data} />
        </div>

      </main>

  );
}

export default App;