const title = (props) => {
    return React.createElement("div", {}, [
        React.createElement("h1", {}, props.type),
        React.createElement("p", {}, props.desc)
    ]);
};

const listDetail1 = (props) => {
    let list = [];
    for (let i = 0; i < props.item.length; i++) {
        list.push(React.createElement("li", { key: i }, props.item[i]));
    }
    return React.createElement("ul", {}, list);
};

//cara kedua menggunakan method .map
const listDetail2 = (props) => {
    return React.createElement("ul",{},
        props.item.map((item, index) => {
            return React.createElement("li", {key: index}, item)
        })
    )
};

const App = () => {
    return React.createElement("div", {}, [
        React.createElement(title, {
            type: "Makanan Favoritku!",
            desc: "Makanan Pembuka saya"
        }),
        React.createElement(listDetail1, {
            item: ["Roti Bakar", "Martabak Manis", "Telur Gulung", "Roti selai coklat"]
        }),
        React.createElement("hr", {}),
        React.createElement(title, {
            desc: "Makanan Utama saya"
        }),
        React.createElement(listDetail2, {
            item: ["Nasi Goreng", "Mie Ayam", "Nasi Padang", "nasi Campur"]
        })
    ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));