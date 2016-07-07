class OffersController < AuthController
	before_action :correct_user, only: [:edit, :update, :destroy]
	before_action :set_offer, only: [:show, :edit, :update, :destroy]
	skip_before_action :authenticate_user!, only: [:index, :show]

	def index
		@offers = Offer.all
	end

	def show
		#@offers = Offer.where(latitude: @offer.latitude,longitude: @offer.longitude)
		@offer = Offer.find(params[:id])
	end

	def new
		@offer = Offer.new
	end

	def edit
	end

	def create
		@offer = current_user.offers.build(offer_params)

		respond_to do |format|
			if @offer.save
				flash[:success] = "Success! Your offer has been posted."
				format.html {redirect_to @offer }
				format.json {render :show, status: :created, location: @post }
			else
				flash[:error] = @offer.errors.full_messages
				format.html { render :new }
				format.json { render json: @offer.errors.full_messages, status: :unprocessable_entity }
			end
		end
		# if @offer.save
		# 	flash[:success] = "Success! Your offer has been posted."
		# 	redirect_to @offer
		# else
		# 	flash[:error] = @offer.errors.full_messages
		# 	render :new
		# end
	end

	def update
		respond_to do |format|
			if @offer.update(offer_params)
				flash[:success] = "Success! Your offer has been updated."
				format.html { redirect_to @offer }
				format.json { render :show, status: :ok, location: @offer }
			else
				flash[:error] = @offer.errors.full_messages
				format.html { render :edit }
				format.json { render json: @offer.errors.full_messages, status: :unprocessable_entity }
			end
		end

		# if @offer.update(offer_params)
		# 	flash[:success] = "Success! Your offer has been updated."
		# 	redirect_to @offer
		# else
		# 	flash[:error] = @offer.errors.full_messages
		# 	render :edit
		# end
	end

	def destroy
		@offer.destroy
		respond_to do |format|
			flash[:success] = "Offer was successfully deleted."
			format.html { redirect_to offers_path }
			format.json { head :no_content }
		end
	end

	private
		def set_offer
			@offer = Offer.find(params[:id])
		end

		def offer_params
			params.require(:offer).permit(:user,:image,
					:line1,:line2,:city,:state,:zip,:rent,:start_date,
					:end_date,:water,:electric,:gas,:heat,:internet,:washdry,
					:aircond,:handicap,:parking,:interested,:school,:description,
					:furnished,:latitude,:longitude)
		end

		def correct_user
			@user = Offer.find(params[:id]).user
			redirect_to(:home) unless (@user == current_user || current_user.uid == "473418502829853")
		end
end