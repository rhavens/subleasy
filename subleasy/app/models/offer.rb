class Offer < ActiveRecord::Base
	belongs_to :user

	validates :image, :format => URI::regexp(%w(http https))
	validate :dates_make_sense 

	def dates_make_sense
		errors.add(:start_date, "The given dates don't make sense.") if (start_date < Date.today) || (start_date > end_date)
	end
end
