class Offers::LikesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_offer

  def create
    @offer.likes.where(user_id: current_user.id).first_or_create

    respond_to do |format|
      format.html { redirect_to @offer }
      format.js
    end
  end

  def destroy
    @offer.likes.where(user_id: current_user.id).destroy_all

    respond_to do |format|
      format.html { redirect_to @offer }
      format.js
    end
  end

  private

    def set_offer
      @offer = Offer.find(params[:offer_id])
    end
end