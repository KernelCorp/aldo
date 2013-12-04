ActiveAdmin.register Master do
  config.filters = false

  index do
    column :id
    column :fio
    default_actions
  end
  
  form do |f|
    f.inputs do
      f.input :fio
      f.input :biography
      f.input :photo, as: :file
    end
    f.actions
  end

end
