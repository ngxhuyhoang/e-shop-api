import { Column, Entity } from 'typeorm';
import { BasedEntity } from '~/common/based.entity';

@Entity({ name: 'product' })
export class ProductEntity extends BasedEntity {
  @Column()
  title: string;

  @Column()
  price: string;

  @Column()
  category: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column()
  image: string;
}
