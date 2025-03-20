import Navbar from "./layout-pages/Navbar";
import SideBar from "./layout-pages/SideBar";

export default function Home() {
  return (
    <div className="w-full h-[666px] flex items-center justify-center">
      <div>
        <h1 className="text-center text-5xl font-bold text-white mb-4">
          Assalomu aleykum, Men <br />
          <span className="text-green-800">Karimov Axmed</span>
        </h1>
        <p className="text-center text-2xl text-neutral-300 mb-3">
          Veb dasturchi va dizayner sifatida natijaga yo'naltirilgan ishchi.
          Veb- <br />
          saytlar va veb-ilovalarni yaratish va boshqarish orqali umumiy <br />
          mahsulot muvaffaqiyatiga erishish maqsadimdir.
        </p>
        <button className="mx-auto text-center block pb-2 pt-2 ps-7 pe-7 bg-green-800 rounded-lg text-white text-xl">
          Loyihalar
        </button>
      </div>
    </div>
  );
}
