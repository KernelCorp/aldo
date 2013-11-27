class AddAttachmentDocumentToPresses < ActiveRecord::Migration
  def self.up
    change_table :presses do |t|
      t.attachment :document
    end
  end

  def self.down
    drop_attached_file :presses, :document
  end
end
