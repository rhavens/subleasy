class OffersController < ApplicationController

	def index
		@offers = Offer.all
		@hash = Gmaps4rails.build_markers(@offers) do |offer, marker|
		  marker.lat offer.latitude
		  marker.lng offer.longitude
		  marker.infowindow (offer.line1 + " " + offer.line2).squish()
		end
	end

	def show
		@offer = Offer.find(params[:id])
	end

	def new
		@offer = Offer.new
	end

	def edit
		@offer = Offer.find(params[:id])
	end

	def create
		@offer = current_user.offers.build(offer_params)

		if @offer.save!
			notice = "Success! Your offer has been posted."
			redirect_to @offer
		else
			error = "Failed to post offer. Correct any errors in your form and try again."
			render :new
		end
	end

	def update
		@offer = Offer.find(params[:id])

		if @offer.update(offer_params)
			flash[:notice] = "Success! Your offer has been updated."
			redirect_to @offer
		else
			flash[:error] = "Failed to post offer. Correct any errors in your form and try again."
			render :edit
		end
	end

	def destroy
		@offer = Offer.find(params[:id])
		@offer.destroy

		redirect_to offers_path
	end

	private
		def offer_params
			params.require(:offer).permit(:user,:image,
					:line1,:line2,:city,:state,:zip,:rent,:start_date,
					:end_date,:water,:electric,:gas,:heat,:internet,:washdry,
					:aircond,:handicap,:parking,:interested)
		end
end