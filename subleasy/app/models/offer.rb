class Offer < ActiveRecord::Base
	belongs_to :user, class_name: "User", :foreign_key => "user_id"

	before_validation :squish_whitespace
	validates :image, :format => URI::regexp(%w(http https))
	validate :dates_make_sense 

	def dates_make_sense
		errors.add(:start_date, "The given dates don't make sense.") if (start_date < Date.today) || (start_date > end_date)
	end

	def squish_whitespace
		self.image = self.image.squish()
		self.line1 = self.line1.squish()
		self.line2 = self.line2.squish()
		self.city = self.city.squish()
	end
end
