ActiveAdmin.register Product do
  config.filters = false

  index do
    column :name
    column :slug
    default_actions
  end
  
  form do |f|
    f.inputs do
      f.input :name
      f.input :text

      f.input :brend

      f.input :background, as: :file
    end
    f.actions
  end

end
