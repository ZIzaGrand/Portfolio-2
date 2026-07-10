import "./Compare.css"
import "./Favorites.css"


function FavoritesButton() {
	return (<>
		<button className="flex compareButton favorites">
			<div className="flex compareButton-left">
				<div className="flex compareButton-header favoritesButton-left">
					<p className="text-preset-4">GBP</p>
					<img src="/src/assets/images/icon-arrow-right.svg" alt="" />
					<p className="text-preset-4">British Pound</p>
				</div>
			</div>
			<div className="flex compareButton-rigth">
				<div className="flex compareButton-header">
					<p className="text-preset-3">736.65</p>
					<div className="positive">
						<p className="text-preset-6">-0.7366</p>
					</div>
				</div>
				<button className="">
					<img src="/src/assets/images/icon-star.svg" alt="" />
				</button>
			</div>

		</button>
	</>)
}


export function Favorites() {
	return (<>
		<div className="flex content-wraper">
			<div className="flex content-header">
				<div className="flex content-header__left">
					<p className="text-preset-3M">PINNED PAIRS</p>
				</div>
				<p className="text-preset-5">10 FAVORITES</p>
			</div>
			<div className="flex compare-wraper">
				<FavoritesButton/>
				<FavoritesButton/>
				<FavoritesButton/>
				<FavoritesButton/>
				<FavoritesButton/>
				<FavoritesButton/>

			</div>
		</div>
	</>)
}