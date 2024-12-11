<script setup>


const props = defineProps({
    buttons: Array,
    legend: String
})

</script>

<template>
    <div class="flex flex-col pt-8 text-zinc-800">
        <h3 class="px-4 font-bold text-sm">{{  props.legend  }}</h3>
        <div class="flex flex-col py-2 font-bold ">
            <button v-for="button in buttons" 
                    :key="button.value" 
                    @click="button.onClick"
                    :class="[
                        'w-56', 'text-xl', 'pr-6', 'pl-2', 'py-3', 'rounded-sm', 'flex', 'items-center', 'transition-all', 'hover:bg-slate-300',
                    ]">
                <UIcon :name="button.icon" class="px-7 text-xl" />
                {{ button.value }}
            </button>
        </div>
    </div>
</template>