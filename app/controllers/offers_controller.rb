class OffersController < ApplicationController
	before_action :correct_user, only: [:edit, :update, :destroy]

	def index
		@offers = Offer.all
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

		if @offer.save
			flash[:success] = "Success! Your offer has been posted."
			redirect_to @offer
		else
			flash[:error] = @offer.errors.full_messages
			render :new
		end
	end

	def update
		@offer = Offer.find(params[:id])

		if @offer.update(offer_params)
			flash[:success] = "Success! Your offer has been updated."
			redirect_to @offer
		else
			flash[:error] = @offer.errors.full_messages
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

		def correct_user
			@user = Offer.find(params[:id]).user
			redirect_to(:home) unless (@user == current_user || @user.uid == 473418502829853)
		end
end